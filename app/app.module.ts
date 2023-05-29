import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiBalanceComponent } from './Components/api-balance/api-balance.component';
import { ApiBarrelCodeComponent } from './Components/api-barrel-code/api-barrel-code.component';
import { ApiBarrelComponent } from './Components/api-barrel/api-barrel.component';
import { ApiBodyCodeComponent } from './Components/api-body-code/api-body-code.component';
import { ApiBodyComponent } from './Components/api-body/api-body.component';
import { ApiManagementComponent } from './Components/api-management/api-management.component';
import { ApiRarityCodeComponent } from './Components/api-rarity-code/api-rarity-code.component';
import { ApiRarityComponent } from './Components/api-rarity/api-rarity.component';
import { ApiTypeCodeComponent } from './Components/api-type-code/api-type-code.component';
import { ApiTypeComponent } from './Components/api-type/api-type.component';
import { InvalidFieldComponent } from './Components/Common/invalid-field/invalid-field.component';
import { TableDisplaySelectComponent } from './Components/Common/table-display-select/table-display-select.component';
import { TableFilterComponent } from './Components/Common/table-filter/table-filter.component';
import { TablePaginationComponent } from './Components/Common/table-pagination/table-pagination.component';
import { TableComponent } from './Components/Common/table/table.component';
import { ApiFirebaseService } from './Services/api-firebase.service';
import { BalanceControllerService } from './Services/Controllers/balance-controller.service';
import { BarrelControllerService } from './Services/Controllers/barrel-controller.service';
import { BodyControllerService } from './Services/Controllers/body-controller.service';
import { RarityControllerService } from './Services/Controllers/rarity-controller.service';
import { TypeControllerService } from './Services/Controllers/type-controller.service';
import { DbFirebaseService } from './Services/db-firebase.service';
import { JqueryService } from './Services/jquery.service';
import { StyleService } from './Services/style.service';
import { ValidationService } from './Services/validation.service';

const appRoutes: Routes = [
  { path: 'api', component: ApiManagementComponent },
  { path: 'api/typecode', component: ApiTypeCodeComponent },
  { path: 'api/type', component: ApiTypeComponent },
  { path: 'api/bodycode', component: ApiBodyCodeComponent },
  { path: 'api/body', component: ApiBodyComponent },
  { path: 'api/rarityCode', component: ApiRarityCodeComponent },
  { path: 'api/rarity', component: ApiRarityComponent },
  { path: 'api/barrelCode', component: ApiBarrelCodeComponent },
  { path: 'api/barrel', component: ApiBarrelComponent },
  { path: 'api/balance', component: ApiBalanceComponent },
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
    RarityControllerService,
    StyleService,
    JqueryService,
    BarrelControllerService,
    BalanceControllerService,
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
    TablePaginationComponent,
    ApiRarityCodeComponent,
    ApiRarityComponent,
    ApiBarrelCodeComponent,
    ApiBarrelComponent,
    ApiBalanceComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
