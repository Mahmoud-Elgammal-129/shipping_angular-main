import { Router } from '@angular/router';
import { GovernatesServiceService } from './../../Service/governates-service.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-governates',
  templateUrl: './governates.component.html',
  styleUrls: ['./governates.component.css']
})
export class GovernatesComponent implements OnInit {
  governates: any[] = [];
  counter: number = 1;

  constructor(
    private location: Location,
    private router: Router,
    private governateService: GovernatesServiceService
  ) {}
  ngOnInit() {
    this.getGovernates();
  }
  getGovernates() {
    this.governateService.getGovernates().subscribe((data: Object) => {
      // Handle the received data
      // Example: Assign the data to a component property
      this.governates = data as any[]; // Assuming the data is an array of any type
    });
  }
  deleteGovernate(id: string) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this governate?'
    );
    this.governateService.deleteGovernate(id).subscribe(
      (response: any) => {
        console.log('Governate deleted successfully:', response);
        location.reload();
        // this.router.navigate(['/get-governate']);
      },
      (error: any) => {
        console.error('Failed to delete governate:', error);
        // Handle error and display appropriate message
      }
    );
  }
}
