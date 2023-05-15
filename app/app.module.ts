import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiManagementComponent } from './Components/api-management/api-management.component';

const appRoutes: Routes = [{ path: 'api', component: ApiManagementComponent }];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  declarations: [AppComponent, ApiManagementComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
