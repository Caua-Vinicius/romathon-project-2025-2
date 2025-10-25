import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/prisma.service';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new UnauthorizedException();
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<Partial<User>> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        name: true,
        email: true,
        createdAt: true,
        clarityLevel: true,
        clarityXp: true,
        xpToNextLevel: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid Token');
    }

    return user;
  }
}
