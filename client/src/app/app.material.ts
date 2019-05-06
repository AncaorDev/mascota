import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatDividerModule, MatProgressSpinnerModule, MatCardModule, MatInputModule, MatListModule, MatTooltipModule } from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  	imports : [MatButtonModule,
               MatCheckboxModule,
			   MatToolbarModule,
			   MatIconModule,
			   MatDividerModule,
			   MatProgressSpinnerModule,
				MatCardModule,
				MatFormFieldModule,
				MatSelectModule,
				MatInputModule,
				MatListModule,
				MatTooltipModule],

	exports : [MatButtonModule,
				MatCheckboxModule,
				MatToolbarModule,
				MatIconModule,
				MatDividerModule,
				MatProgressSpinnerModule,
				MatCardModule,
				MatFormFieldModule,
				MatSelectModule,
				MatInputModule,
				MatListModule,
				MatTooltipModule],
})
export class MaterialModule { }