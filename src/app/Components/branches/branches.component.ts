import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BranchesServiceService } from './../../Service/branches-service.service';
import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent {
  Branches: any[] = [];
  counter: number = 1;
 
  constructor(
    private location: Location,
    private router: Router,
    private branchesService: BranchesServiceService
  ) {}
  ngOnInit() {
 
    this.getBranch();
  }
  getBranch() {
    this.branchesService.getBranches().subscribe((data: Object) => {
      // Handle the received data
      // Example: Assign the data to a component property
      
      this.Branches = data as any[]; 
      this.Branches.forEach(element => {
        element.date= formatDate(element.date, 'yyyy-MM-dd', 'en-US')
      });
      // Assuming the data is an array of any type
     
    });
  }
  deleteBranch(id: string) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this Branch?'
    );
    this.branchesService.deleteBranch(id).subscribe(
      (response: any) => {
        console.log('Branch deleted successfully:', response);
        location.reload();
        // this.router.navigate(['/get-governate']);
      },
      (error: any) => {
        console.error('Failed to delete Branch:', error);
        // Handle error and display appropriate message
      }
    );
  }
}
