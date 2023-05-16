import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiManagementComponent } from './Components/api-management/api-management.component';
import { ApiTypeCodeComponent } from './Components/api-type-code/api-type-code.component';
import { ApiTypeComponent } from './Components/api-type/api-type.component';
import { ApiFirebaseService } from './Services/api-firebase.service';
import { DbFirebaseService } from './Services/db-firebase.service';

const appRoutes: Routes = [
  { path: 'api', component: ApiManagementComponent },
  { path: 'api/typecode', component: ApiTypeCodeComponent },
  { path: 'api/type', component: ApiTypeComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
  ],
  providers: [DbFirebaseService, ApiFirebaseService],
  declarations: [
    AppComponent,
    ApiManagementComponent,
    ApiTypeComponent,
    ApiTypeCodeComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
