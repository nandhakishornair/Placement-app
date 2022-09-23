import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';

export class Admin{
  constructor(
    public email:string,
    public password:string
  ){}
}

@Component({
  selector: 'app-admn-list',
  templateUrl: './admn-list.component.html',
  styleUrls: ['./admn-list.component.css']
})
export class AdmnListComponent implements OnInit {
  admin:any;
  constructor(
    private admn:AdmnAuthService,
    private router:Router,
    private http:HttpClient
    ) { }

  ngOnInit(): void {
    this.getAdmin()
  }
  getAdmin(){
    this.http.get("http://localhost:3000/admin/admins").subscribe(
      response=>{
        this.admin=response;
        console.log(response)
      }
    )
  }
  status()
    {
    }
    reset(admin:any){
      localStorage.setItem("editPwd", admin._id.toString());
        this.router.navigate(['admin/reset'])
    }
}
