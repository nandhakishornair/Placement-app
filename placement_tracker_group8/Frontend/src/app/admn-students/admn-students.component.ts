import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdmnAuthService } from '../admn-auth.service';
import { Router } from '@angular/router';
export class Student{
  constructor(
    public firstname:string,
    public lastname:string,
    public email:string
  ){}
}
@Component({
  selector: 'app-admn-students',
  templateUrl: './admn-students.component.html',
  styleUrls: ['./admn-students.component.css']
})
export class AdmnStudentsComponent implements OnInit {
students:Student[]=[];

student={
  firstname:'',
  lastname:'',
  email:''
}
firstname!:string
lastname!:string
email!:string
  
  constructor(
    private http:HttpClient,
    private admn:AdmnAuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.getStudents();
  }
  getStudents(){
    this.http.get<any>("http://localhost:3000/admin/students").subscribe(
      response=>{
        this.students=response;
        console.log(response)
      }
    )
    }
    newStudent(){
      const newstud={
        firstname:this.student.firstname,
        lastname:this.student.lastname,
        email:this.student.email
      }
      this.admn.newStudent(newstud)
      this.admn.getStudent(this.email)
      this.router.navigate(['admin/ictakstudents'])
      
    }
    toDelete(stud:any){
      this.admn.deleteStudent(stud._id).subscribe((data)=>{
        this.students=this.students.filter(p=>p!=stud);
        
      })

}
}
