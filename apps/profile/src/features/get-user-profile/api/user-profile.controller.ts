import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

interface GetUserProfileRequest {
  id: string;
}

interface UserProfileResponse {
  id: string;
  name: string;
  age: string;
}

@Controller()
export class UserProfileController {
  private profiles: Map<string, UserProfileResponse> = new Map([
    ['610db576-60da-4b12-b975-21bcf47ad6c3', {
      id: '610db576-60da-4b12-b975-21bcf47ad6c3',
      name: 'John Doe',
      age: '32',
    }],
    ['bdb37552-1077-4ff5-8ac6-230d92c84884', {
      id: 'bdb37552-1077-4ff5-8ac6-230d92c84884',
      name: 'Jane Smith',
      age: '55',
    }],
  ]);

  @GrpcMethod('ProfileService', 'GetUserProfile')
  getProfile(data: GetUserProfileRequest): UserProfileResponse {
    const profile = this.profiles.get(data.id);
    if (!profile) {
      throw new Error('Profile not found');
    }
    return profile;
  }
}
