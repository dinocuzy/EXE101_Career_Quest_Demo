import { AnalyticsEvent, PriceVariant } from '../types/game';

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private priceVariant: PriceVariant;
  private sessionCode: string;

  constructor() {
    const variants: PriceVariant[] = [49000, 79000, 119000];
    this.priceVariant = variants[Math.floor(Math.random() * variants.length)];
    
    // Generate 6-character uppercase alphanumeric session code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.sessionCode = code;

    this.logEvent('session_start', {
      priceVariant: this.priceVariant,
      sessionCode: this.sessionCode,
    });
    this.logEvent('price_variant_assigned', {
      priceVariant: this.priceVariant,
      sessionCode: this.sessionCode,
    });
  }

  public getPriceVariant(): PriceVariant {
    return this.priceVariant;
  }

  public getSessionCode(): string {
    return this.sessionCode;
  }

  public logEvent(eventName: string, data?: Record<string, unknown>): void {
    const event: AnalyticsEvent = {
      eventName,
      data: {
        ...data,
        priceVariant: this.priceVariant,
        sessionCode: this.sessionCode,
      },
      timestamp: Date.now(),
    };
    this.events.push(event);
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public getMetrics() {
    const clicksVaoCa = this.events.filter((e) => e.eventName === 'click_vao_ca').length;
    const clicksLamTest = this.events.filter((e) => e.eventName === 'click_lam_test').length;
    const completedShifts = this.events.filter((e) => e.eventName === 'shift_completed').length;
    const startedShifts = this.events.filter((e) => e.eventName === 'shift_started').length;
    const paywallViews = this.events.filter((e) => e.eventName === 'paywall_view').length;
    const paywallCtaClicks = this.events.filter((e) => e.eventName === 'paywall_cta_click').length;
    const qrClicks = this.events.filter((e) => e.eventName === 'qr_click').length;
    const paymentConfirmDemos = this.events.filter((e) => e.eventName === 'payment_confirm_demo').length;

    const aiRatings = this.events
      .filter((e) => e.eventName === 'ai_report_rating' && typeof e.data?.rating === 'number')
      .map((e) => e.data?.rating as number);

    const avgAiRating = aiRatings.length
      ? (aiRatings.reduce((a, b) => a + b, 0) / aiRatings.length).toFixed(1)
      : 'Chưa có';

    const completionRate = startedShifts > 0
      ? `${Math.round((completedShifts / startedShifts) * 100)}%`
      : '0%';

    return {
      clicksVaoCa,
      clicksLamTest,
      startedShifts,
      completedShifts,
      completionRate,
      paywallViews,
      paywallCtaClicks,
      qrClicks,
      paymentConfirmDemos,
      avgAiRating,
      priceVariant: this.priceVariant,
      sessionCode: this.sessionCode,
      totalEvents: this.events.length,
    };
  }

  public exportJSON(): string {
    return JSON.stringify(
      {
        metrics: this.getMetrics(),
        events: this.events,
      },
      null,
      2
    );
  }
}

export const analytics = new AnalyticsService();
