import { Injectable, Inject } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { IWebRequest, ILoginService, ICommonService } from '../interfaces/interfaces';

@Injectable()
export class SecurityGuard implements CanActivate {
    constructor( @Inject('ILoginService') private loginService: ILoginService) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        return this.loginService.canExecute(url);
    }
}
