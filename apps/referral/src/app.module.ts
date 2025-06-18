import { Module } from '@nestjs/common';
import { ReferralStatsController } from './features/get-referral-stats/api/referral-stats.controller';

@Module({
  imports: [],
  controllers: [ReferralStatsController],
})
export class AppModule {}
