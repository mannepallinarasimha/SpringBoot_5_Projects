import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  id: number;
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; 
    this.employeeService.getEmployeeById(this.id).subscribe(data =>{
      this.employee = data;
    },error => {console.log(error)});
  }

  onSubmit(){
    
    console.log("Geeting ID from Activated Route: ",this.id);
    this.employeeService.updateEmployeeById(this.id, this.employee).subscribe(data =>{
      console.log(data);
      this.router.navigate(['employees']);
    });
  }

}
