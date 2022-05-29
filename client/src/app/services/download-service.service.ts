import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DownloadServiceService {

  constructor(private http: HttpClient) { }
  download_release(release: string)
  {
    return this.http.get("http://localhost:4200/api/download-release?release=" + release, {responseType: 'blob'});
  }
}
