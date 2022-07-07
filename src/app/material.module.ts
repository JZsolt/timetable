import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  exports: [MatFormFieldModule, MatSelectModule],
})
export class MaterialModule {}
