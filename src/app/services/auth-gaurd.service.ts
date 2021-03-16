import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private authService: AuthService){}
    
    //checks if user has access to requested route
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
                    return this.authService.isAuthenticated();
                }
}