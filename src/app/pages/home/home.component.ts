import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('home component');
    const tmpFile = new File(['TEST'], '/src/locale/test.json');

    this.authService.user.subscribe((user) => {
      if (user) {
        this.http
          .get<any>(`http://localhost:1337/api/users`)
          .subscribe((data) => {
            this.users = data;
          });
      }
    });
  }
}
