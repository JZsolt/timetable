import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { SpreadsheetComponent } from 'src/app/spreadsheet/spreadsheet.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'spreadsheet',
    component: SpreadsheetComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
