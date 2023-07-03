import { Router } from '@angular/router';
import { CitiesServiceService } from './../../Service/cities-service.service';
import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  Cities: any[] = [];
  counter: number = 1;

  constructor(
    private location: Location,
    private router: Router,
    private CitiesService: CitiesServiceService
  ) {}
  ngOnInit() {
    this.getCity();
  }
  getCity() {
    this.CitiesService.getCities().subscribe((data: Object) => {
      // Handle the received data
      // Example: Assign the data to a component property
      this.Cities = data as any[]; // Assuming the data is an array of any type
    });
  }
  deleteCity(id: string) {
    const confirmDelete = confirm('Are you sure you want to delete this City?');
    this.CitiesService.deleteCity(id).subscribe(
      (response: any) => {
        console.log('City deleted successfully:', response);
        location.reload();
        // this.router.navigate(['/get-governate']);
      },
      (error: any) => {
        console.error('Failed to delete City:', error);
        // Handle error and display appropriate message
      }
    );
  }
}
