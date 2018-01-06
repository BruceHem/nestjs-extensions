import { CanActivate, ExecutionContext, Guard } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AUTH_META_KEY } from './auth.constants';

@Guard()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authorizationChecker: AuthorizationCheckerFn,
    private readonly reflector: Reflector = new Reflector()
  ) {}

  async canActivate(req, context: ExecutionContext) {
    req.__AUTH_CHECK__ = this.authorizationChecker;
    const roles = this.reflector.get<any[]>(AUTH_META_KEY, context.handler);
    if (roles && roles.length) {
      const [x] = await this.authorizationChecker(req, roles);
      return x;
    }
    return true;
  }
}

export type AuthorizationCheckerFn = (req, roles: string[], required?: boolean) => Promise<[boolean, any]>;
