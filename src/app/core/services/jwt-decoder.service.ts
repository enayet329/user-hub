import { Injectable } from '@angular/core';
import { JwtPayload } from '../model/common.model';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  public getClaimFromToken(token: string | null, claimName: keyof JwtPayload): JwtPayload[keyof JwtPayload] | null {
    if (!token) return null;

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 

    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );

    const decodedPayload: JwtPayload = JSON.parse(jsonPayload);

    if (decodedPayload && decodedPayload.hasOwnProperty(claimName)) {
      return decodedPayload[claimName];
    } else {
      return null;
    }
  }
}
