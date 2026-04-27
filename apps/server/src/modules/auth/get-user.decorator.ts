import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

/**
 * Custom decorator to extract the user from the request object.
 * @param _data - Data passed to the decorator (not used).
 * @param {ExecutionContext} ctx - The execution context.
 * @returns {User} The user extracted from the request object.
 */
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
