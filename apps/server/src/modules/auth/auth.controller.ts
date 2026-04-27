import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { Request, Response } from 'express';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Registers a new user.
   * @param {AuthCredentialsDto} authCredentialsDto - The authentication credentials.
   * @returns {Promise<void>} A promise that resolves when the user is registered.
   */
  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  /**
   * Authenticates a user and returns an access token.
   * @param {AuthCredentialsDto} authCredentialsDto - The authentication credentials.
   * @param {Response} response - The response object.
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the access token.
   */
  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto, response);
  }

  /**
   * Refreshes the access token for an authenticated user.
   * @param {User} user - The authenticated user.
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the new access token.
   */
  @UseGuards(RefreshJwtGuard)
  @Post('/refresh')
  refresh(@GetUser() user: User): Promise<{ accessToken: string }> {
    return this.authService.refresh(user);
  }

  /**
   * Signs out the authenticated user.
   * @param {Request} request - The request object.
   * @param {Response} response - The response object.
   * @returns {void}
   */
  @Post('/signout')
  signOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signOut(request, response);
  }
}
