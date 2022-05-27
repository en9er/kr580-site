import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminReleaseUploaderComponent } from './components/admin-release-uploader/admin-release-uploader.component';
import {FileUploadModule} from "ng2-file-upload";
import {AngularMaterialModule} from "../angular-material/angular-material.module";
import { AdminReleasesComponent } from './components/admin-releases/admin-releases.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminReleaseUploaderComponent,
    AdminReleasesComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FileUploadModule,
    FormsModule
  ]
})
export class AdminModule { }
