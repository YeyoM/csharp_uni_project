import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  private router = inject(Router);
  private toast = inject(ToastService);
  private accountService = inject(AccountService);
  protected creds: any = {};
  protected loggedIn = signal(false);

  login(): void {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        this.router.navigate(['/']);
        this.creds = {};
        this.toast.success('Logged in successfully');
      },
      error: error => {
        console.log(error);
        this.toast.error('Failed to login');
      }
    });
  }

  logout(): void {
    this.loggedIn.set(false);
    this.router.navigateByUrl('/');
  }
}