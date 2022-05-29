import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
const URL = 'http://localhost:8000/api/upload-release';
@Component({
  selector: 'app-admin-release-uploader',
  templateUrl: './admin-release-uploader.component.html',
  styleUrls: ['./admin-release-uploader.component.css']
})
export class AdminReleaseUploaderComponent implements OnInit {
  release_name: string
  allowedFileExtentions = [".rar", ".zip", ".gz", ".tar", "zipx", ".7z", ".s7z"]
  allowedTypes = ['application/x-tar', "application/gzip", "application/x-7z-compressed", "application/x-rar-compressed", "application/zip"]
  errorMsg = ""
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'file',
  });
  constructor(private toastr: ToastrService, private router: Router) {
    this.release_name = "";
  }
  ngOnInit() {

  }
  onSubmit() {
    console.log(this.uploader.queue[this.uploader.queue.length - 1].file)
    if(this.allowedTypes.includes(this.uploader.queue[this.uploader.queue.length - 1].file.type))
    {
      let ind = this.uploader.queue[this.uploader.queue.length - 1].file.name.lastIndexOf('.')
      if(ind !== -1) {
        this.uploader.queue[this.uploader.queue.length - 1].file.name = this.release_name + this.uploader.queue[this.uploader.queue.length - 1].file.name.substring(ind)
        this.uploader.uploadItem(this.uploader.queue[this.uploader.queue.length - 1])
        this.reloadComponent()
      }
      else {
        this.errorMsg = "error unexpected file extension"
      }
    }
    else {
      this.errorMsg = "error unexpected file type"
    }
  }

  reloadComponent() {
    window.location.reload();
  }
}
