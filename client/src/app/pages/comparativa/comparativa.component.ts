import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
	selector: 'app-comparativa',
	templateUrl: './comparativa.component.html',
	styleUrls: ['./comparativa.component.scss']
})

export class ComparativaComponent implements OnInit {
	// disabled_send:boolean = true;
	lista:any = [{value:1, viewValue: "Opción 1"}]
	data_opt:any;
	step1:boolean = false;
	step2:boolean = true;
	formDetail: FormGroup;

	constructor(private app_srv:AppService,
				private form_build:FormBuilder) {
	}

	ngOnInit() {
		this.app_srv.getJSON().subscribe(res => {
			this.data_opt = res;
		})
		this.formDetail = this._builderForm();
	}

	redirect() {
		console.log('redirect');
	}

	private _builderForm() {
        let form = this.form_build.group({
			feeding	: ['', [Validators.required]],
			race	: ['', [Validators.required]],
			size	: ['', [Validators.required]],
			age		: ['', [Validators.required]]
        });
        // form.valueChanges.subscribe(() => {
        //     this.invalidForm = this.newUserForm.invalid;
        // })
        return form;
	}
	processInfo(){
		this.step1 = true;
		this.step2 = false;
	}
	returnOpt(){
		this.step1 = false;
		this.step2 = true;
		// console.log(this.formDetail.value);
	}
}
