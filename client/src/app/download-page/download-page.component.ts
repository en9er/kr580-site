import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {DownloadServiceService} from "../services/download-service.service";

@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})
export class DownloadPageComponent implements OnInit {

  releases: string[] = [];
  constructor(private http: HttpClient, private router: Router, private downloadService: DownloadServiceService) { }

  ngOnInit(): void {
    this.getReleases().subscribe(res => {
      console.log(res)
      this.releases = res.files
    })
  }

  getReleases(): Observable<any> {
    return this.http.get<any>("http://localhost:8000/api/releases")
  }

  downloadFile(release: string) {
    this.downloadService.download_release(release).subscribe(data => {
      this.save(data, release)
    })
  }

  save(res: any, filename: string){
    let url = window.URL.createObjectURL(res);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
