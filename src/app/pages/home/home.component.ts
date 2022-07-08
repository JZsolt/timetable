import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:1337/api/users', {
        headers: new HttpHeaders({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY1NzI3NzE2MSwiZXhwIjoxNjU5ODY5MTYxfQ.dEGfEYajmuMiNaOHjRh0U_qHGGf_OqOKD0252qj61Eo',
        }),
      })
      .subscribe((data) => {
        console.log(data);
        this.users = data;
      });
  }
}
