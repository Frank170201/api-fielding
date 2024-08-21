import { Injectable } from 'src/shared/dependencies/injectable';
import { AuthService } from '../../../user/domain/services/auth.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateService extends AuthService {
  constructor(private readonly jwtService: JwtService) {
    super();
  }
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  async generateToken(payload: JwtPayload): Promise<string> {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
