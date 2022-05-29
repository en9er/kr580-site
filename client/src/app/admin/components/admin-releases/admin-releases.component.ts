import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-releases',
  templateUrl: './admin-releases.component.html',
  styleUrls: ['./admin-releases.component.css']
})
export class AdminReleasesComponent implements OnInit {
  releases: string[] = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getReleases().subscribe(res => {
      console.log(res)
      this.releases = res.files
    })
  }

  getReleases(): Observable<any> {
    return this.http.get<any>("http://localhost:8000/api/releases")
  }

  deleteRelease(name: string){
    const data = {
      token: localStorage.getItem("token")
    }
    this.http.post<any>("http://localhost:8000/api/delete-release?name=" + name, data).subscribe(res => {
      console.log(res)
      this.reloadComponent();
    })
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    this.getReleases().subscribe(res => {
      console.log(res)
      this.releases = res.files
    })
  }
}
