import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  console = console;
  isAutenticated = false;
  selectedLangName = 'en';
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAutenticated = !!user;
    });
  }

  onLogOut() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  selectedLang(event) {
    this.selectedLangName = event.target.innerText;
  }
}
