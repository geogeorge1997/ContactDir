import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ScrollingModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class MaterialModule { }
