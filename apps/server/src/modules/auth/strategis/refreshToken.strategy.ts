import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../jwt-payload.interface';
import { User } from '../user.entity';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  /**
   * Constructs a new instance of the RefreshJwtStrategy class.
   * @param {UserRepository} userRepository - The user repository.
   * @param {ConfigService} configService - The configuration service.
   */
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Authentication;
        },
      ]),
    });
  }

  /**
   * Validates the JWT payload and retrieves the corresponding user.
   * @param {JwtPayload} payload - The JWT payload.
   * @returns {Promise<User>} A promise that resolves to the user.
   * @throws {UnauthorizedException} If the user is not found.
   */
  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;

    const user: User = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
