import { ActivatedRoute, Router } from '@angular/router';
import { GovernatesServiceService } from './../../Service/governates-service.service';
import { CitiesServiceService } from './../../Service/cities-service.service';
import { Component } from '@angular/core';
import { FormControl,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {
  cityId: string = '';
  CityName: string = '';
  isDeleted: boolean = false;
  isEditMode: boolean = false;
  governateId: string = '';
  regular_Shipping: number = 0;
  governates: any[] = [];
  selectedGovernateId: string = '';

  constructor(
    private route: ActivatedRoute,
    private governateService: GovernatesServiceService,
    private citiesService: CitiesServiceService,
    private router: Router
  ) {}
 cityForm =new FormGroup({
  CityName:new FormControl('',[Validators.required,Validators.minLength(3)]),
    regularShipping:new FormControl('',[Validators.required]),
    governate:new FormControl('',[Validators.required])
  })
  fetchGovernates() {
    this.governateService.getGovernates().subscribe((data: any) => {
      this.governates = data;
      console.log(this.governates);
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params=> {
      this.cityId = params['id']; // Assuming the route parameter is named 'id'
      if (this.cityId) {
        this.isEditMode = true;
        this.getCity(this.cityId);
      }
      this.fetchGovernates();
    });
  }
  get getcityhName() {
    return this.cityForm.controls['CityName'];
  }
  get getregularShipping() {
    return this.cityForm.controls['regularShipping'];
  }
  get getgovernate() {
    return this.cityForm.controls['governate'];
  }

  getCity(id: string) {
    this.citiesService.getCityById(id).subscribe((data: any) => {
      this.CityName = data.name;
      this.regular_Shipping = data.regular_Shipping;
      this.governateId = data.id_Governate;
      this.isDeleted = data.isDeleted;
      this.selectedGovernateId = this.governateId;
    });
  }

  submitForm() {
    if(this.cityForm.valid){
    const cityData = {
      id: this.cityId,
      name: this.CityName,
      isDeleted: this.isDeleted,
      regular_Shipping: this.regular_Shipping,
      id_Governate: this.selectedGovernateId
    };

    if (this.isEditMode) {
      this.updateCity(cityData);
    } else {
      this.addCity(cityData);
    }
    }else{  alert("data not valid")}
  }

  addCity(cityData: any) {
    this.citiesService.createCity(cityData).subscribe((data: Object) => {});
    this.router.navigate(['/get-Cities']);
  }

  updateCity(cityData: any) {
    this.citiesService.updateCity(cityData).subscribe(
      (response: any) => {
        this.router.navigate(['/get-Cities']);
      },
      (error: any) => {
        console.error('Failed to update governate:', error);
      }
    );
    console.log(cityData);
  }
}
