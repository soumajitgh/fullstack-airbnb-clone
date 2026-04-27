import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from '../user.repository';
import { JwtPayload } from '../jwt-payload.interface';
import { User } from '../user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * Constructs a new instance of the JwtStrategy class.
   * @param {UserRepository} userRepository - The user repository.
   * @param {ConfigService} configService - The configuration service.
   */
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
