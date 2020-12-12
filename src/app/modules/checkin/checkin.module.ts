import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckinComponent } from './checkin.component';
import {CheckinRoutingModule} from './checkin-routing/checkin-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {AppRoutingModule} from '../../app-routing.module';
import {MaterialModule} from '../../shared/material/material.module';



@NgModule({
  declarations: [CheckinComponent],
  imports: [
    CheckinRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class CheckinModule { }
