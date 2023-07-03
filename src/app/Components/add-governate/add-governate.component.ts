import { GovernatesServiceService } from './../../Service/governates-service.service';
import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-governate',
  templateUrl: './add-governate.component.html',
  styleUrls: ['./add-governate.component.css']
})
export class AddGovernateComponent implements OnInit {
  governateName: string = '';
  isDeleted: boolean = false;
  isEditMode: boolean = false;
  governateId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private governateService: GovernatesServiceService,
    private router: Router
  ) {}
  governateForm =new FormGroup({
    governateName:new FormControl('',[Validators.required,Validators.minLength(3)]),
      
    })

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.governateId = params['id']; // Assuming the route parameter is named 'id'
      if (this.governateId) {
        this.isEditMode = true;
        this.getGovernate(this.governateId);
      }
    });
  }
  get getgovernateName() {
    return this.governateForm.controls['governateName'];
  }
  getGovernate(id: string) {
    this.governateService.getGovernateById(id).subscribe((data: any) => {
      this.governateName = data.name;
      this.isDeleted = data.isDeleted;
    });
  }

  submitForm() {
    if(this.governateForm.valid){
    const governateData = {
      id: this.governateId,
      name: this.governateName,
      isDeleted: this.isDeleted
    };

    if (this.isEditMode) {
      this.updateGovernate(governateData);
    } else {
      this.addGovernate(governateData);
    }
  }else{alert("data not valid")}
  }

  addGovernate(governateData: any) {
    this.governateService
      .createGovernate(governateData)
      .subscribe((data: Object) => {});
    this.router.navigate(['/get-governate']);
  }

  updateGovernate(governateData: any) {
    this.governateService.updateGovernate(governateData).subscribe(
      (response: any) => {
        this.router.navigate(['/get-governate']);
      },
      (error: any) => {
        console.error('Failed to update governate:', error);
      }
    );
    console.log(governateData);
  }
}
