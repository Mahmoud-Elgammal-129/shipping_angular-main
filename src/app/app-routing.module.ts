import { AddBranchComponent } from './Components/add-branch/add-branch.component';
import { BranchesComponent } from './Components/branches/branches.component';
import { AddCityComponent } from './Components/add-city/add-city.component';
import { CitiesComponent } from './Components/cities/cities.component';
import { GovernatesComponent } from './Components/governates/governates.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGovernateComponent } from './Components/add-governate/add-governate.component';

const routes: Routes = [
  // Default route
  // { path: '', component: HomeComponent },
  // Route for adding a Branch
  { path: 'get-Branches', component: BranchesComponent },
  { path: 'add-branch', component: AddBranchComponent },
  { path: 'add-branch/:id', component: AddBranchComponent },
  // Route for adding a Cities
  { path: 'get-Cities', component: CitiesComponent },
  { path: 'add-city', component: AddCityComponent },
  { path: 'add-city/:id', component: AddCityComponent },

  // Route for getting governates
  { path: 'get-governate', component: GovernatesComponent },

  { path: 'add-governate', component: AddGovernateComponent },

  { path: 'update-governate/:id', component: AddGovernateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
