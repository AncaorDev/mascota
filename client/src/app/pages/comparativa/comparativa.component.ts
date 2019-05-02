import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector    : 'app-comparativa',
	templateUrl : './comparativa.component.html',
	styleUrls   : ['./comparativa.component.scss']
})

export class ComparativaComponent implements OnInit, OnDestroy {
	// disabled_send:boolean = true;
	lista:any = [{value:1, viewValue: "Opción 1"}]
	data_opt:any;
	step1:boolean = false;
	step2:boolean = true;
	formDetail: FormGroup;
	sub_data_opt:Subscription = new Subscription();
	sub_params:Subscription = new Subscription();

	step:number = 0;
	super_pet:any;
	sabor:boolean = false;
	beneficios:boolean = false;

	tastes:any = [
					{id: 1 , name : 'Carne y Hueso' , imagen : './assets/images/svg/carne_hueso.svg' , enable : false},
					{id: 2 , name : 'Carne fresca vacuno' , imagen : './assets/images/svg/carne_fresca_vacuno.svg', enable : false},
					{id: 3 , name : 'Pollo' , imagen : './assets/images/svg/pollo_pierna.svg', enable : false},
					{id: 4 , name : 'Visceras' , imagen : './assets/images/svg/visceras.svg', enable : false},
					{id: 5 , name : 'Pescado' , imagen : './assets/images/svg/pescado.png', enable : false},
					{id: 6 , name : 'Cordero' , imagen : './assets/images/svg/cordero.svg', enable : false},
					{id: 7 , name : 'Vegetariano' , imagen : './assets/images/svg/ensalada.svg', enable : false},
					// {id: 1 , name : 'Carne y Hueso' , imagen : './assets/images/svg/carne_hueso.svg' , enable : false},
					// {id: 2 , name : 'Carne fresca vacuno' , imagen : './assets/images/svg/carne_fresca_vacuno.svg', enable : false},
					// {id: 3 , name : 'Pollo' , imagen : './assets/images/svg/pollo_pierna.svg', enable : false},
					// {id: 4 , name : 'Visceras' , imagen : './assets/images/svg/visceras.svg', enable : false},
					// {id: 5 , name : 'Pescado' , imagen : './assets/images/svg/pescado.png', enable : false},
					// {id: 6 , name : 'Cordero' , imagen : './assets/images/svg/cordero.svg', enable : false},
					// {id: 7 , name : 'Vegetariano' , imagen : './assets/images/svg/ensalada.svg', enable : false}
				];

	constructor(
		private app_srv:AppService,
		private route: ActivatedRoute,
		private form_build:FormBuilder
	) {}

	ngOnInit(): void {
		// this.app_srv.getJSON().subscribe(res => {
		// 	this.data_opt = res;
		// })
		this.formDetail = this._builderForm();

		this.sub_params = this.route.params.pipe(filter(fil=> fil['id_mascota'] != undefined && this.getValidParam(fil['id_mascota']))).subscribe(params => {
			this.app_srv.getCombosByMascota(params['id_mascota']);
		 });
		this.sub_data_opt = this.app_srv.combos_mascota.subscribe(res => {
			this.data_opt = res;
		});
	}

	ngOnDestroy(): void {
		this.sub_data_opt.unsubscribe();
		this.sub_params.unsubscribe();
	}

	redirect() {
		console.log('redirect');
	}

	 getValidParam(param:string): boolean {
		if (!/^([0-9])*$/.test(param))
			return false;
		return true;
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

	goToStep(step) {
		this.step = step;
	}

	enableItem(item) {
		console.log(item);
	}

	tastesSelect() {
		return this.tastes.filter(res => res.enable).length > 0 ? false : true;
	}

	resumeData() {
		this.app_srv.getDataSuperPet().subscribe(res => {
			this.super_pet = res;
			this.super_pet.map(row => {
				console.log(row);
			})
		});
	}
}

// import { Component, OnInit, HostListener } from '@angular/core';
// import { AppService } from 'src/app/app.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// @Component({
// 	selector: 'app-comparativa',
// 	templateUrl: './comparativa.component.html',
// 	styleUrls: ['./comparativa.component.scss']
// })

// export class ComparativaComponent implements OnInit {
// 	// disabled_send:boolean = true;
// 	lista:any = [{value:1, viewValue: "Opción 1"}]
// 	data_opt:any;


// 	// carne_fresca_vacuno.svg
// 	// pollo_pierna.svg
// 	// visceras
// 	constructor(private app_srv:AppService,
// 				private form_build:FormBuilder) {
// 	}

// 	ngOnInit() {
// 		this.app_srv.getJSON().subscribe(res => {
// 			this.data_opt = res;
// 		})
// 		this.formDetail = this._builderForm();
// 	}

// 	redirect() {
// 		console.log('redirect');
// 	}

// 	goToStep(step) {
// 		this.step = step;
// 	}

// 	private _builderForm() {
//         let form = this.form_build.group({
// 			feeding	: ['', [Validators.required]],
// 			race	: ['', [Validators.required]],
// 			size	: ['', [Validators.required]],
// 			age		: ['', [Validators.required]]
//         });
//         // form.valueChanges.subscribe(() => {
//         //     this.invalidForm = this.newUserForm.invalid;
//         // })
//         return form;
// 	}
// 	processInfo(){
// 		this.step = 1;
// 		// this.step1 = true;
// 		// this.step2 = false;
// 	}
// 	returnOpt(){
// 		this.step = 0;
// 		// this.step1 = false;
// 		// this.step2 = true;
// 		// console.log(this.formDetail.value);
// 	}
// }

