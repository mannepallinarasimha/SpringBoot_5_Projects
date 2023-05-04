import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  id: number;
  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
   
  //   this.employees = [{
  //     "id":1,
  //     "firstName":"Narasimha",
  //     "lastName":"Mannepalli",
  //     "emailId":"nara@gmail.com"
  //   },
  //   {
  //     "id":2,
  //     "firstName":"Priyanka",
  //     "lastName":"Mannepalli",
  //     "emailId":"priya@gmail.com"
  //   }
  // ];
this.getEmployees();

  }
  private getEmployees(){
    this.employeeService.getAllEmployees().subscribe(
      data => {
        console.log(data);
          this.employees = data;
      }, 
      error =>{
        console.log(error);
      }
    )
  }

  private getEmployeeById(){
    this.employeeService.getEmployeeById(this.id).subscribe(data =>{
      console.log(data)
    },error =>{console.log(error)});
  }

  updateEmployee(id: number){
    this.router.navigate(['update-employee', id]); 
  }
  viewEmployee(id: number){
    this.router.navigate(['view-employee', id]); 
  }

  deleteEmployee(id: number){
    //this.id = this.route.snapshot.params['id'];
    console.log("ID from ::::", id);
    this.employeeService.deleteEmployee(id).subscribe(data =>{
      console.log("Employee with "+id+" deleted successfully...");
     this.goToEmployeesList();
    }, error => {console.log(error)});
  }
  goToEmployeesList(){
    this.router.navigate(['employees']); 
  }
}
