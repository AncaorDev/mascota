import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
	selector: 'app-recomedacion',
	templateUrl: './recomedacion.component.html',
	styleUrls: ['./recomedacion.component.scss']
})

export class RecomendacionComponent implements OnInit {
	// disabled_send:boolean = true;
	lista:any = [{value:1, viewValue: "Opción 1"}]
	data_opt:any;
	filterData:any;

	formDetail: FormGroup;

	constructor(private app_srv:AppService,
				private form_build:FormBuilder) {
	}

	ngOnInit() {
		let obj = {

		}
		this.app_srv.getDataScraper(obj).subscribe(res => {
			this.filterData  = res;
		});
	}

	deleteItem(raw){
		console.log(raw);
		let obj = {
			scraper : raw
		}
		this.app_srv.deleteDataScraper(obj).subscribe(res => {
			if(res.rowCount>0){
				this.filterData = this.filterData.filter(row => !(row.id_scraper == raw.id_scraper && row._id_site == raw._id_site))
			}
			// this.filterData  = res;
		});
	}
	// redirect() {
	// 	console.log('redirect');
	// }

	// private _builderForm() {
    //     let form = this.form_build.group({
	// 		feeding	: ['', [Validators.required]],
	// 		race	: ['', [Validators.required]],
	// 		size	: ['', [Validators.required]],
	// 		age		: ['', [Validators.required]]
    //     });
    //     // form.valueChanges.subscribe(() => {
    //     //     this.invalidForm = this.newUserForm.invalid;
    //     // })
    //     return form;
	// }
	// processInfo(){
	// 	console.log(this.formDetail.value);
	// }
}
