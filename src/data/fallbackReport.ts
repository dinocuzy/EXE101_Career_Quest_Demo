import { AIReportData } from '../types/game';

export const FALLBACK_REPORTS_BY_ROLE: Record<string, AIReportData> = {
  LT: {
    isFallback: true,
    workStyleSummary:
      'Bạn thể hiện phong cách làm việc điềm tĩnh, chú trọng sự thấu cảm và đặt sự hài lòng của khách hàng lên hàng đầu ngay cả khi gặp áp lực dồn dập tại tiền sảnh. Bạn biết cách điều phối công việc linh hoạt giữa các bộ phận liên quan thay vì hành động đơn độc. Tư duy tôn trọng chuẩn mực dịch vụ giúp bạn giữ vững uy tín cho khách sạn trong những tình huống rủi ro.',
    strengths: [
      {
        title: 'Xử lý khiếu nại khách hàng thấu cảm & tinh tế',
        evidence: 'Tại tình huống phòng view biển (LT1), bạn đã chủ động xin lỗi chân thành và tặng voucher đồ uống bù đắp thay vì trốn tránh trách nhiệm.',
        skill: 'Giao tiếp (C)',
      },
      {
        title: 'Phối hợp đồng đội nhịp nhàng lúc cao điểm',
        evidence: 'Khi đoàn 40 khách đến sớm 2 tiếng (LT2), bạn lập tức liên hệ bộ phận buồng phòng ưu tiên chuẩn bị trước các phòng khả dụng.',
        skill: 'Làm việc nhóm (T)',
      },
      {
        title: 'Ứng biến công nghệ giải cứu nguy cấp',
        evidence: 'Lúc máy in hóa đơn kẹt (LT3), bạn nhanh chóng chuyển sang xuất hóa đơn điện tử gửi thẳng qua email cho khách kịp chuyến bay.',
        skill: 'Thích ứng linh hoạt (A)',
      },
    ],
    improvements: [
      {
        title: 'Quản trị năng lượng cá nhân bền bỉ hơn',
        advice: 'Một số thời điểm bạn nhận quá nhiều việc cùng lúc khiến năng lượng sụt giảm; cần phân bổ quyền xử lý cho trợ lý sảnh.',
        skill: 'Giải quyết vấn đề (P)',
      },
      {
        title: 'Quyết đoán hơn trong các tranh chấp tế nhị',
        advice: 'Khi gặp sự cố nghi vấn thất lạc đồ (LT4), cần lập biên bản nhanh theo đúng quy trình an ninh để tránh kéo dài căng thẳng.',
        skill: 'Trách nhiệm & Đạo đức (E)',
      },
      {
        title: 'Tối ưu chi phí đền bù dịch vụ',
        advice: 'Cân nhắc ngân sách voucher và phòng nâng hạng linh hoạt hơn để không làm thâm hụt chi phí vận hành chi nhánh.',
        skill: 'Quản trị chi phí',
      },
    ],
    suggestedRoles: [
      {
        role: 'Quản trị Tiền sảnh Khách sạn Quốc tế (Front Office Manager)',
        matchPercent: 94,
        reason: 'Khả năng giao tiếp thấu cảm và giữ bình tĩnh tuyệt vời trước khách hàng khó tính.',
      },
      {
        role: 'Chuyên viên Quan hệ Khách hàng VIP (Guest Relations Specialist)',
        matchPercent: 91,
        reason: 'Sự chu đáo, khéo léo trong cử chỉ và tư duy chăm sóc trải nghiệm toàn diện.',
      },
      {
        role: 'Điều hành Dịch vụ Lưu trú & Du lịch (Hospitality Operations)',
        matchPercent: 86,
        reason: 'Kỹ năng kết nối liên bộ phận buồng phòng, ẩm thực và an ninh đồng bộ.',
      },
    ],
    subjectCombos: [
      {
        name: 'D01 (Toán, Ngữ văn, Tiếng Anh)',
        reason: 'Tổ hợp vàng cho ngành Quản trị Khách sạn – Du lịch, mở rộng cơ hội học tập môi trường quốc tế.',
      },
      {
        name: 'D14 (Ngữ văn, Lịch sử, Tiếng Anh)',
        reason: 'Giúp bạn am hiểu văn hóa sâu sắc, bổ trợ trực tiếp cho tư duy giao tiếp đa quốc gia.',
      },
    ],
    nextSteps: [
      'Tham gia câu lạc bộ Tiếng Anh hoặc MC tại trường THPT để nâng cao phản xạ ngôn ngữ thực tế.',
      'Đọc thêm về quy trình dịch vụ 5 sao quốc tế (SOP) và kỹ năng quản lý cảm xúc (EQ).',
      'Đăng ký tham quan thực tế (Hotel Tour) tại các trường Đại học có khoa Khách sạn hàng đầu.',
    ],
  },
  HD: {
    isFallback: true,
    workStyleSummary:
      'Bạn là một hướng dẫn viên giàu lòng trắc ẩn, luôn đặt sự an toàn tính mạng của du khách lên trên lợi ích kinh tế tức thời. Trước các biến cố thời tiết hoặc phát sinh dọc đường tour, bạn phản ứng nhanh nhạy và giữ được không khí gắn kết cho đoàn. Sự chân thành và đạo đức nghề nghiệp là điểm tựa lớn nhất giúp bạn chiếm trọn lòng tin của du khách.',
    strengths: [
      {
        title: 'Ưu tiên tuyệt đối an toàn tính mạng du khách',
        evidence: 'Khi bão biển bất ngờ đổ bộ (HD2), bạn đã dứt khoát dừng tour đảo mạo hiểm và chuyển sang tham quan văn hóa đất liền an toàn.',
        skill: 'Trách nhiệm & Đạo đức (E)',
      },
      {
        title: 'Sơ cấp cứu và ứng biến khẩn cấp chuẩn xác',
        evidence: 'Lúc du khách bị sốc nhiệt giữa đường đền dốc (HD3), bạn nhanh chóng sơ cứu mát, bù điện giải và gọi cứu trợ 115 kịp thời.',
        skill: 'Giải quyết vấn đề (P)',
      },
      {
        title: 'Bình tĩnh giải quyết xung đột khiếu nại công khai',
        evidence: 'Khi điểm tham quan đóng cửa đột xuất (HD4), bạn mời khách bức xúc ra khu vực riêng để trao đổi minh bạch và đền bù hợp lý.',
        skill: 'Giao tiếp (C)',
      },
    ],
    improvements: [
      {
        title: 'Dự phòng phương án B sớm hơn trong lịch trình',
        advice: 'Nên kiểm tra thời tiết cảng vụ từ trước 24 giờ để thông báo trước cho đoàn, tránh tình trạng bị động sát giờ di chuyển.',
        skill: 'Thích ứng linh hoạt (A)',
      },
      {
        title: 'Kỹ năng quản lý đám đông khi có người lạc',
        advice: 'Cần phân chia các nhóm nhỏ có trưởng nhóm học sinh để kiểm soát số lượng chặt chẽ hơn tại điểm tham quan rộng lớn.',
        skill: 'Làm việc nhóm (T)',
      },
      {
        title: 'Kiểm soát thể lực cá nhân trên tour đường dài',
        advice: 'Dành các quãng nghỉ ngắn trên xe để bổ sung nước và tái tạo năng lượng dẫn đoàn.',
        skill: 'Quản trị năng lượng',
      },
    ],
    suggestedRoles: [
      {
        role: 'Hướng dẫn viên Du lịch Quốc tế (International Tour Guide)',
        matchPercent: 95,
        reason: 'Bản lĩnh ứng biến thực địa xuất sắc và trách nhiệm bảo vệ đoàn cao.',
      },
      {
        role: 'Chuyên viên Thiết kế Tour Trải nghiệm & Sinh thái (Tour Designer)',
        matchPercent: 88,
        reason: 'Tư duy sâu sắc về văn hóa địa phương và khả năng lường trước rủi ro hành trình.',
      },
      {
        role: 'Điều hành Tour & Quản trị Lữ hành (Tour Operations Manager)',
        matchPercent: 85,
        reason: 'Năng lực phối hợp với các nhà cung ứng vận tải, nhà hàng và trạm dừng chân.',
      },
    ],
    subjectCombos: [
      {
        name: 'D01 (Toán, Ngữ văn, Tiếng Anh)',
        reason: 'Cần thiết cho giao tiếp lữ hành quốc tế và tính toán chi phí tour chính xác.',
      },
      {
        name: 'C00 (Ngữ văn, Lịch sử, Địa lý)',
        reason: 'Nền tảng kiến thức địa lý tự nhiên và lịch sử phong phú giúp bài thuyết minh lôi cuốn.',
      },
    ],
    nextSteps: [
      'Tìm hiểu các chứng chỉ sơ cấp cứu cơ bản (First Aid) dành cho người làm du lịch.',
      'Rèn luyện thể lực qua chạy bộ hoặc bơi lội để chuẩn bị cho những chuyến đi dài ngày.',
      'Tập luyện kỹ năng thuyết trình trước đám đông qua các bài tập nhóm trên lớp.',
    ],
  },
  DP: {
    isFallback: true,
    workStyleSummary:
      'Bạn là một điều phối viên có tư duy hệ thống sắc sảo, luôn chuẩn bị sẵn kịch bản dự phòng cho những tình huống rủi ro kỹ thuật và nhân sự. Dưới áp lực thời gian tính bằng phút của sự kiện trực tiếp, bạn giữ được cái đầu lạnh để chỉ huy đội ngũ hậu cần. Phong cách làm việc thực tế, thẳng thắn nhưng thấu tình đạt lý giúp các sự kiện về đích an toàn.',
    strengths: [
      {
        title: 'Phản ứng nhanh với sự cố kỹ thuật sân khấu',
        evidence: 'Khi máy chiếu chính gặp trục trặc trước giờ G (DP1), bạn đã kích hoạt màn LED phụ và kéo giãn intro âm nhạc cực kỳ mượt mà.',
        skill: 'Giải quyết vấn đề (P)',
      },
      {
        title: 'Linh hoạt điều phối nhân sự dự phòng',
        evidence: 'Lúc MC kẹt xe (DP2), bạn quyết định đôn MC dự phòng lên thay thế và tóm tắt nhanh kịch bản trọng yếu.',
        skill: 'Làm việc nhóm (T)',
      },
      {
        title: 'Thương lượng hợp đồng & rủi ro với khách hàng chuyên nghiệp',
        evidence: 'Trước yêu cầu đổi layout sân khấu sát giờ (DP3), bạn phân tích an toàn kết cấu và xác nhận phụ lục văn bản rõ ràng.',
        skill: 'Giao tiếp (C)',
      },
    ],
    improvements: [
      {
        title: 'Khảo sát nhà cung cấp thực phẩm dự phòng kỹ lưỡng',
        advice: 'Sự cố thiếu suất ăn (DP4) cho thấy cần ký biên bản cam kết số lượng tối thiểu với nhà cung ứng tiệc trước 24 giờ.',
        skill: 'Trách nhiệm & Đạo đức (E)',
      },
      {
        title: 'Giảm thiểu gánh nặng tự thân',
        advice: 'Nên chia nhỏ đầu mối cho từng trưởng nhóm kỹ thuật, âm thanh, ánh sáng thay vì trực tiếp chạy khắp sân khấu.',
        skill: 'Thích ứng linh hoạt (A)',
      },
      {
        title: 'Kiểm soát chặt chẽ ngân sách phát sinh',
        advice: 'Thiết lập quỹ dự phòng rủi ro 10-15% trong kế hoạch tài chính sự kiện ban đầu.',
        skill: 'Quản lý tài chính',
      },
    ],
    suggestedRoles: [
      {
        role: 'Chuyên viên Điều phối & Tổ chức Sự kiện (Event Operations Specialist)',
        matchPercent: 96,
        reason: 'Khả năng ứng biến nhanh trước sự cố sân khấu và tư duy kịch bản dự phòng vững vàng.',
      },
      {
        role: 'Quản lý Hậu cần & Sản xuất Sân khấu (Stage & Logistics Producer)',
        matchPercent: 90,
        reason: 'Kỹ năng kết nối đội ngũ kỹ thuật, âm thanh, ánh sáng và nhà cung ứng nhịp nhàng.',
      },
      {
        role: 'Quản trị Dự án Truyền thông & Lễ hội (Project Event Manager)',
        matchPercent: 87,
        reason: 'Khả năng cân bằng giữa yêu cầu của khách hàng và tính khả thi an toàn thi công.',
      },
    ],
    subjectCombos: [
      {
        name: 'D01 (Toán, Ngữ văn, Tiếng Anh)',
        reason: 'Rèn luyện tư duy logic tính toán chi phí và kỹ năng đàm phán hợp đồng song ngữ.',
      },
      {
        name: 'A01 (Toán, Vật lý, Tiếng Anh)',
        reason: 'Hỗ trợ đắc lực cho việc hiểu biết kỹ thuật âm thanh, ánh sáng và kết cấu giàn khung sự kiện.',
      },
    ],
    nextSteps: [
      'Đăng ký ban tổ chức các sự kiện ngày hội, giải thể thao hoặc dạ hội của trường THPT.',
      'Học cách sử dụng các phần mềm lập timeline dự án và sơ đồ bố trí không gian (layout).',
      'Thực hành lập bảng dự toán chi phí chi tiết cho các hoạt động ngoại khóa.',
    ],
  },
  PV: {
    isFallback: true,
    workStyleSummary:
      'Bạn là một nhân viên phục vụ tận tâm với đôi mắt quan sát tinh tế và chuẩn mực an toàn thực phẩm khắt khe. Dù trong khung giờ cao điểm nhà hàng đông nghẹt khách, bạn vẫn giữ được nụ cười lịch sự và thái độ ân cần. Sự can đảm bảo vệ quyền lợi và an toàn của thực khách khẳng định đạo đức nghề nghiệp đáng quý của bạn.',
    strengths: [
      {
        title: 'Tuyệt đối trung thực & bảo vệ sức khỏe thực khách',
        evidence: 'Khi có nghi vấn dị ứng nguyên liệu (PV1), bạn lập tức thu hồi món, xin lỗi và phối hợp bếp trưởng kiểm tra chặt chẽ.',
        skill: 'Trách nhiệm & Đạo đức (E)',
      },
      {
        title: 'Xử lý khéo léo tình huống khách say xỉn',
        evidence: 'Trước khách quấy rối (PV3), bạn từ chối phục vụ cồn một cách lịch thiệp, bảo vệ không gian an toàn cho các bàn xung quanh.',
        skill: 'Giao tiếp (C)',
      },
      {
        title: 'Gợi ý món ăn thay thế thông minh khi hết hàng',
        evidence: 'Lúc món đặc biệt hết (PV4), bạn khéo léo giới thiệu món tương đương cùng tầm giá kèm tráng miệng tặng kèm làm khách hài lòng.',
        skill: 'Thích ứng linh hoạt (A)',
      },
    ],
    improvements: [
      {
        title: 'Quy trình kiểm tra bàn đặt chặt chẽ hơn',
        advice: 'Tình huống trùng bàn số 8 (PV2) nhắc nhở cần đồng bộ sổ bàn giấy và phần mềm quản trị bàn POS liên tục.',
        skill: 'Giải quyết vấn đề (P)',
      },
      {
        title: 'Hỗ trợ đồng đội bếp trong giờ cao điểm',
        advice: 'Chủ động cập nhật tình trạng nguyên liệu với bếp trước mỗi ca ăn chính để tránh bị động khi order dồn dập.',
        skill: 'Làm việc nhóm (T)',
      },
      {
        title: 'Bảo toàn năng lượng di chuyển',
        advice: 'Tối ưu hóa cung đường bưng bê và dùng khay đẩy đa năng để giảm bớt mệt mỏi thể lực.',
        skill: 'Quản trị thể lực',
      },
    ],
    suggestedRoles: [
      {
        role: 'Quản trị Nhà hàng & Dịch vụ Ăn uống Cao cấp (F&B Restaurant Manager)',
        matchPercent: 93,
        reason: 'Sự nhạy cảm tinh tế với trải nghiệm bàn ăn và đạo đức vệ sinh an toàn thực phẩm.',
      },
      {
        role: 'Chuyên gia Trải nghiệm Ẩm thực & Rượu vang (Sommelier / Food Concierge)',
        matchPercent: 89,
        reason: 'Khả năng tư vấn món ăn linh hoạt và phong thái phục vụ chuẩn mực, lịch thiệp.',
      },
      {
        role: 'Giám sát Tiêu chuẩn Dịch vụ F&B (F&B Quality Supervisor)',
        matchPercent: 86,
        reason: 'Tuân thủ nghiêm ngặt quy trình an toàn thực phẩm và chăm sóc khách hàng.',
      },
    ],
    subjectCombos: [
      {
        name: 'D01 (Toán, Ngữ văn, Tiếng Anh)',
        reason: 'Cánh cửa vào các khoa Quản trị Nhà hàng – Khách sạn của các trường đại học quốc tế.',
      },
      {
        name: 'B00 (Toán, Hóa học, Sinh học)',
        reason: 'Bổ trợ kiến thức khoa học dinh dưỡng, an toàn thực phẩm và quản trị ẩm thực chuyên sâu.',
      },
    ],
    nextSteps: [
      'Tìm hiểu về văn hóa ẩm thực Á – Âu và các tiêu chuẩn bài trí bàn tiệc chuẩn quốc tế.',
      'Tập quan sát ngôn ngữ cơ thể của người khác để đoán biết nhu cầu trước khi họ lên tiếng.',
      'Tham gia trải nghiệm làm thêm bán thời gian trong môi trường F&B chuyên nghiệp.',
    ],
  },
};

export const DEFAULT_FALLBACK_REPORT: AIReportData = FALLBACK_REPORTS_BY_ROLE.LT;
