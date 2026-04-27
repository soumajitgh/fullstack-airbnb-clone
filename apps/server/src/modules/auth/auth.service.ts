import {
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Registers a new user.
   * @param {AuthCredentialsDto} authCredentialsDto - The authentication credentials.
   * @returns {Promise<void>} A promise that resolves when the user is registered.
   */
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  /**
   * Authenticates a user and returns an access token.
   * @param {AuthCredentialsDto} authCredentialsDto - The authentication credentials.
   * @param {Response} response - The response object.
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the access token.
   * @throws {UnauthorizedException} If the login credentials are incorrect.
   */
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    response: Response,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;

    const user = await this.userRepository.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };

      const accessToken: string = this.jwtService.sign(payload);

      const refreshToken: string = this.jwtService.sign(payload, {
        expiresIn: '7d',
      });
      const refreshTokenExpiration = new Date();
      refreshTokenExpiration.setMilliseconds(
        refreshTokenExpiration.getMilliseconds() + ms('7d'),
      );

      response.cookie('Authentication', refreshToken, {
        httpOnly: true,
        secure: true,
        expires: refreshTokenExpiration,
      });

      return { accessToken };
    } else {
      throw new UnauthorizedException('Check your login credentials');
    }
  }

  /**
   * Signs out the authenticated user.
   * @param {Request} request - The request object.
   * @param {Response} response - The response object.
   * @returns {Promise<void>} A promise that resolves when the user is signed out.
   * @throws {NotAcceptableException} If the request does not contain a valid refresh token.
   */
  async signOut(request: Request, response: Response): Promise<void> {
    // parsing access token
    const cookies = request.cookies;
    if (!cookies.Authentication) {
      throw new NotAcceptableException('must contain valid refresh token');
    }

    response.clearCookie('Authentication', {
      httpOnly: true,
      secure: true,
    });
  }

  /**
   * Refreshes the access token for an authenticated user.
   * @param {User} user - The authenticated user.
   * @returns {Promise<{ accessToken: string }>} A promise that resolves to an object containing the new access token.
   */
  async refresh(user: User): Promise<{ accessToken: string }> {
    const { email } = user;

    const payload: JwtPayload = { email };

    const accessToken: string = this.jwtService.sign(payload);

    return { accessToken };
  }
}
