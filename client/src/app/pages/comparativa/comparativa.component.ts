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
	filterData:any;
	step:number = 0;
	super_pet:any;
	sabor:boolean = false;
	beneficios:boolean = false;
	resume= false;
	tastes:any = [
					{id: 1 , name_filter : 'carne', name : 'Carne y Hueso' , imagen : './assets/images/svg/carne_hueso.svg' , enable : false},
					{id: 2 , name_filter : 'res', name : 'Carne fresca vacuno' , imagen : './assets/images/svg/carne_fresca_vacuno.svg', enable : false},
					{id: 3 , name_filter : 'pollo', name : 'Pollo' , imagen : './assets/images/svg/pollo_pierna.svg', enable : false},
					{id: 4 , name_filter : 'carne', name : 'Visceras' , imagen : './assets/images/svg/visceras.svg', enable : false},
					{id: 5 , name_filter : 'pescado', name : 'Pescado' , imagen : './assets/images/svg/pescado.png', enable : false},
					{id: 6 , name_filter : 'cordero', name : 'Cordero' , imagen : './assets/images/svg/cordero.svg', enable : false},
					{id: 7 , name_filter : 'vegetal', name : 'Vegetariano' , imagen : './assets/images/svg/ensalada.svg', enable : false},
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
		// age: 3
		// feeding: 3
		// race: 2
		// size: 4
		this.step = 5;
		let race = this.data_opt.race.data.filter(res => res.value == this.formDetail.value.race);
		let feeding = this.data_opt.feeding.data.filter(res => res.value == this.formDetail.value.feeding);
		let age =  this.data_opt.age.data.filter(res => res.value == this.formDetail.value.age);
		let size = this.data_opt.size.data.filter(res => res.value == this.formDetail.value.size);
		let taste_select = this.tastes.filter(res => res.enable);
		this.app_srv.getDataSuperPet().subscribe(res => {
			this.super_pet  = res;
			this.filterData = this.super_pet.filter(row => {
				let is_data = 0;
				taste_select.map(res => {
					let age_desc = age[0].desc.substring(0,5);
					if(row.Nombre.toLowerCase().includes(res.name_filter.toLowerCase()) && row.Nombre.toLowerCase().includes(age_desc.toLowerCase())) {
						is_data++;
					}
				});
				return is_data > 0;
			});
			console.log(this.filterData);
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

