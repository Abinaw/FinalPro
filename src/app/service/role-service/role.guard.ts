import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CurrentLoggedInUserService } from '../current-logged-user-service/current-logged-in-user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router,
        private currentLoggedInUserService: CurrentLoggedInUserService,
        private toastr: ToastrService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const role = this.currentLoggedInUserService.getRole();
        const allowedRoles = next.data['roles'] as Array<string>;
        if (allowedRoles.includes(role)) {
            return true;
        } else {
            this.toastr.error("Access is denied!")
            this.router.navigate(['/dash_board']);
            return false;
        }
    }
}
