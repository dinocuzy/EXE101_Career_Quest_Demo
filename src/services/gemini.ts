import { GoogleGenAI, Type } from '@google/genai';
import { PlayerStats, DecisionLog, AIReportData } from '../types/game';
import { FALLBACK_REPORTS_BY_ROLE, DEFAULT_FALLBACK_REPORT } from '../data/fallbackReport';

export async function generateAIReport(
  roleId: string,
  roleName: string,
  stats: PlayerStats,
  title: string,
  history: DecisionLog[]
): Promise<AIReportData> {
  const fallback = FALLBACK_REPORTS_BY_ROLE[roleId] || DEFAULT_FALLBACK_REPORT;

  // Check for API key in environment
  const apiKey =
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
    '';

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return { ...fallback, isFallback: true };
  }

  // Define JSON schema for Gemini 2.5 Flash
  const reportSchema = {
    type: Type.OBJECT,
    properties: {
      workStyleSummary: {
        type: Type.STRING,
        description: 'Đoạn văn 3-4 câu nhận xét tổng quan phong cách hành xử dưới áp lực của học sinh',
      },
      strengths: {
        type: Type.ARRAY,
        description: 'Chính xác 3 điểm mạnh, mỗi điểm bắt buộc trích dẫn bằng chứng từ quyết định cụ thể của học sinh',
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Tiêu đề điểm mạnh' },
            evidence: {
              type: Type.STRING,
              description: 'Trích dẫn bằng chứng cụ thể từ tình huống học sinh đã xử lý',
            },
            skill: { type: Type.STRING, description: 'Tên kỹ năng liên quan' },
          },
          required: ['title', 'evidence', 'skill'],
        },
      },
      improvements: {
        type: Type.ARRAY,
        description: 'Chính xác 3 điểm cần cải thiện, kèm lời khuyên hành động cụ thể',
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Tiêu đề điểm cần cải thiện' },
            advice: {
              type: Type.STRING,
              description: 'Lời khuyên hành động cụ thể gắn với các tình huống trong ca',
            },
            skill: { type: Type.STRING, description: 'Tên kỹ năng liên quan' },
          },
          required: ['title', 'advice', 'skill'],
        },
      },
      suggestedRoles: {
        type: Type.ARRAY,
        description: 'Chính xác 3 vị trí nghề nghiệp trong ngành Nhà hàng - Khách sạn - Du lịch',
        items: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING, description: 'Tên vị trí nghề nghiệp' },
            matchPercent: { type: Type.INTEGER, description: 'Tỷ lệ phù hợp (từ 70 đến 98)' },
            reason: { type: Type.STRING, description: 'Lý do phù hợp' },
          },
          required: ['role', 'matchPercent', 'reason'],
        },
      },
      subjectCombos: {
        type: Type.ARRAY,
        description: 'Chính xác 2 tổ hợp môn xét tuyển đại học THPT phù hợp (ví dụ D01, C00, A01, D14...)',
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Tên tổ hợp môn kèm các môn thành phần' },
            reason: { type: Type.STRING, description: 'Lý do tổ hợp này phù hợp với phong cách' },
          },
          required: ['name', 'reason'],
        },
      },
      nextSteps: {
        type: Type.ARRAY,
        description: 'Chính xác 3 hành động tiếp theo thiết thực cho học sinh THPT',
        items: { type: Type.STRING },
      },
    },
    required: [
      'workStyleSummary',
      'strengths',
      'improvements',
      'suggestedRoles',
      'subjectCombos',
      'nextSteps',
    ],
  };

  const systemInstruction =
    'Bạn là chuyên gia hướng nghiệp cho học sinh THPT Việt Nam. Văn phong thân thiện, cụ thể, không sáo rỗng, dựa trên chính các quyết định của học sinh. Trả về JSON đúng schema, tiếng Việt.';

  const prompt = `
Vị trí đã thử việc: ${roleName}
Danh hiệu đạt được: ${title}
Năng lượng cuối ca: ${stats.energy}/10
Uy tín cuối ca: ${stats.rep}/10

Điểm số 5 nhóm kỹ năng:
- Giao tiếp (Communication - C): ${stats.skills.C}/10
- Giải quyết vấn đề (Problem Solving - P): ${stats.skills.P}/10
- Thích ứng linh hoạt (Adaptability - A): ${stats.skills.A}/10
- Làm việc nhóm (Teamwork - T): ${stats.skills.T}/10
- Trách nhiệm & Đạo đức (Responsibility & Ethics - E): ${stats.skills.E}/10

Danh sách 6 quyết định của học sinh trong ca trực:
${history
  .map(
    (h, idx) =>
      `Thẻ ${idx + 1} [ID: ${h.situationId}]: Tình huống "${h.situationText.slice(0, 70)}..." -> Học sinh chọn: "${h.optionText.slice(0, 60)}..." (Đánh giá: ${h.quality}).`
  )
  .join('\n')}

LƯU Ý QUAN TRỌNG:
1. Mỗi điểm mạnh và điểm cần cải thiện PHẢI trích dẫn bằng chứng cụ thể từ ít nhất 1 quyết định trong danh sách 6 quyết định trên của học sinh.
2. 3 vị trí nghề nghiệp gợi ý nằm trong ngành Nhà hàng - Khách sạn - Du lịch (Hospitality & Tourism).
3. 2 tổ hợp môn xét tuyển đại học THPT phổ biến tại Việt Nam (như D01, A01, C00, D14, C03...) giải thích cụ thể lý do vì sao hợp với bạn này.
4. Đảm bảo đúng định dạng JSON được yêu cầu.
`;

  // Helper with 20s timeout
  const callWithTimeout = async () => {
    const ai = new GoogleGenAI({ apiKey });
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API timeout sau 20s')), 20000)
    );

    const apiPromise = ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: reportSchema,
        temperature: 0.7,
      },
    });

    const response = await Promise.race([apiPromise, timeoutPromise]);
    if (response && response.text) {
      const parsed = JSON.parse(response.text.trim()) as AIReportData;
      return { ...parsed, isFallback: false };
    }
    throw new Error('Empty response from Gemini');
  };

  // Attempt 1
  try {
    return await callWithTimeout();
  } catch (err1) {
    console.warn('Gemini generateContent lần 1 thất bại, thử lại lần 2:', err1);
    // Retry 1 time
    try {
      return await callWithTimeout();
    } catch (err2) {
      console.warn('Gemini generateContent lần 2 thất bại, chuyển sang báo cáo mẫu:', err2);
      return { ...fallback, isFallback: true };
    }
  }
}
