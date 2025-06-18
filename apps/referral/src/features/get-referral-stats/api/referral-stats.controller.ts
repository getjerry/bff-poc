import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface GetReferralStatsRequest {
  userId: string;
}

interface ReferralStatsResponse {
  id: string;
  userId: string;
  referralCount: string;
}

@Controller()
export class ReferralStatsController {
  private referralStats: Map<string, ReferralStatsResponse> = new Map([
    ['610db576-60da-4b12-b975-21bcf47ad6c3', {
      id: '0d634566-ffe2-4912-a95d-9d344cea1eb4',
      userId: '610db576-60da-4b12-b975-21bcf47ad6c3',
      referralCount: '12',
    }],
  ]);

  @GrpcMethod('ReferralStatsService', 'GetReferralStats')
  getReferralStats(data: GetReferralStatsRequest): ReferralStatsResponse {
    const stats = this.referralStats.get(data.userId);
    if (!stats) {
      throw new Error('Referral stats not found');
    }
    return stats;
  }
}
