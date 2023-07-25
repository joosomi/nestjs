import { User } from '@app/user/decorators/user.decorator';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { ProfileService } from './profile.service';
import { ProfileResponseInterface } from './types/profileResponse.interface';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  //GET Profile
  //GET /api/profiles/:username
  @Get(':username')
  async getProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.getProfile(
      currentUserId,
      profileUsername,
    );

    return this.profileService.buildProfileResponse(profile);
  }

  //FOLLOW User
  //POST /api/profiles/:username/follow
  @Post(':username/follow')
  @UseGuards(AuthGuard)
  async followProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.followProfile(
      currentUserId,
      profileUsername,
    );

    return this.profileService.buildProfileResponse(profile);
  }

  //UNFOLLOW Uesr
  //DELETE /api/profiles/:username/follow
  @Delete(':username/follow')
  @UseGuards(AuthGuard)
  async unfollowProfile(
    @User('id') currentUserId: number,
    @Param('username') profileUsername: string,
  ): Promise<ProfileResponseInterface> {
    const profile = await this.profileService.unfollowProfile(
      currentUserId,
      profileUsername,
    );

    return this.profileService.buildProfileResponse(profile);
  }
}
