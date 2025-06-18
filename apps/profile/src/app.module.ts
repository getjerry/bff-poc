import { Module } from '@nestjs/common';
import { UserProfileController } from './features/get-user-profile/api/user-profile.controller';

@Module({
  imports: [],
  controllers: [UserProfileController],
})
export class AppModule {}
