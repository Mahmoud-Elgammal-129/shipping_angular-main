import { CitiesServiceService } from './../../Service/cities-service.service';
import { BranchesServiceService } from './../../Service/branches-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent {
  cityId: string = '';
  branchId: string = '';
  BranchName: string = '';
  isDeleted: boolean = false;
  isEditMode: boolean = false;
  Date: string = '';
  cities: any[] = [];
  selectedCityId: string = '';
 
  constructor(
    private route: ActivatedRoute,
    private branchService: BranchesServiceService,
    private citiesService: CitiesServiceService,
    private router: Router
  ) {
   
  }
  branchesForm =new FormGroup({
    BranchName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    Date:new FormControl('',[Validators.required]),
    cities:new FormControl('',[Validators.required])
  })

  
  fetchCities() {
    this.citiesService.getCities().subscribe((data: any) => {
      this.cities = data;
    });
  }
  ngOnInit()  {
    this.route.params.subscribe(params => {
      this.branchId = params['id'];
      console.log(this.branchId); // Assuming the route parameter is named 'id'
      if (this.branchId) {
        console.log('success');
        this.isEditMode = true;
        this.getCity(this.branchId);
      }
      this.fetchCities();
    });
  }
  get getBranchName() {
    return this.branchesForm.controls['BranchName'];
  }
  get getdate() {
    return this.branchesForm.controls['Date'];
  }
  get getcities() {
    return this.branchesForm.controls['cities'];
  }
  getCity(id: string) {
    console.log('suucess21');
    this.branchService.getBranchById(id).subscribe((data: any) => {
      this.BranchName = data.name;
      this.Date = formatDate(data.date, 'yyyy-MM-dd', 'en-US');
      this.cityId = data.id_city;
      this.isDeleted = data.isDeleted;
      this.selectedCityId = this.cityId;
      console.log(this.cityId);
    });
  }

  submitForm() {
    if(this.branchesForm.valid){

    
    const branchData = {
      id: this.branchId, // Corrected assignment
      name: this.BranchName,
      isDeleted: this.isDeleted,
      date: this.Date,
      id_City: this.selectedCityId
    };

    if (this.isEditMode) {
      this.updateBranch(branchData);
    } else {
      this.addBranch(branchData);
    }
   
    }
  else{
    alert("data not valid")
  }
  }

  addBranch(branchData: any) {
    this.branchService.createBranch(branchData).subscribe((data: Object) => {});
    this.router.navigate(['/get-Branches']);
  }

  updateBranch(branchData: any) {
    console.log(branchData);
    this.branchService.updateBranch(branchData).subscribe(
      (response: any) => {
        this.router.navigate(['/get-Branches']);
      },
      (error: any) => {
        console.error('Failed to update governate:', error);
      }
    );
    console.log(branchData);
  }
 
}
