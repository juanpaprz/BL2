import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiManagementComponent } from './Components/api-management/api-management.component';
import { ApiTypeComponent } from './Components/api-type/api-type.component';
import { FirebaseService } from './Services/firebase.service';

const appRoutes: Routes = [
  { path: 'api', component: ApiManagementComponent },
  { path: 'api/type', component: ApiTypeComponent },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule],
  providers: [FirebaseService],
  declarations: [AppComponent, ApiManagementComponent, ApiTypeComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
