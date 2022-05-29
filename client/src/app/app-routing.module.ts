import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./not-found/not-found.component";
import {MainpageComponent} from "./mainpage/mainpage.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginComponent} from "./login/login.component";
import {LoginGuard} from "./guards/login.guard";
import {DownloadPageComponent} from "./download-page/download-page.component";

const routes: Routes = [
  {path: '', component: MainpageComponent},
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    canDeactivate: [LoginGuard]
  },
  {
    path: 'download',
    component: DownloadPageComponent
  },
  {
    path: "**", component: NotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
