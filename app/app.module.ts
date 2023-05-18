import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiBodyCodeComponent } from './Components/api-body-code/api-body-code.component';
import { ApiBodyComponent } from './Components/api-body/api-body.component';
import { ApiManagementComponent } from './Components/api-management/api-management.component';
import { ApiTypeCodeComponent } from './Components/api-type-code/api-type-code.component';
import { ApiTypeComponent } from './Components/api-type/api-type.component';
import { InvalidFieldComponent } from './Components/Common/invalid-field/invalid-field.component';
import { TableDisplaySelectComponent } from './Components/Common/table-display-select/table-display-select.component';
import { TableFilterComponent } from './Components/Common/table-filter/table-filter.component';
import { TableComponent } from './Components/Common/table/table.component';
import { ApiFirebaseService } from './Services/api-firebase.service';
import { BodyControllerService } from './Services/Controllers/body-controller.service';
import { TypeControllerService } from './Services/Controllers/type-controller.service';
import { DbFirebaseService } from './Services/db-firebase.service';
import { ValidationService } from './Services/validation.service';

const appRoutes: Routes = [
  { path: 'api', component: ApiManagementComponent },
  { path: 'api/typecode', component: ApiTypeCodeComponent },
  { path: 'api/type', component: ApiTypeComponent },
  { path: 'api/bodycode', component: ApiBodyCodeComponent },
  { path: 'api/body', component: ApiBodyComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DbFirebaseService,
    ApiFirebaseService,
    ValidationService,
    BodyControllerService,
    TypeControllerService,
  ],
  declarations: [
    AppComponent,
    ApiManagementComponent,
    ApiTypeComponent,
    ApiTypeCodeComponent,
    TableComponent,
    ApiBodyCodeComponent,
    InvalidFieldComponent,
    ApiBodyComponent,
    TableDisplaySelectComponent,
    TableFilterComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
