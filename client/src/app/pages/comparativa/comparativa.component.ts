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
	sub_data_sabores:Subscription = new Subscription();
	filterData:any;
	step:number = 0;
	super_pet:any;
	sabor:boolean = false;
	beneficios:boolean = false;
	resume= false;
	id_mascota:string = null;
	tastes:any[] = [];
	benefice:any[] = []
	last_step:number;
	constructor(
		private app_srv:AppService,
		private route: ActivatedRoute,
		private form_build:FormBuilder
	) {}

	ngOnInit(): void {
		this.formDetail = this._builderForm();

		this.sub_params = this.route.params.pipe(filter(fil=> fil['id_mascota'] != undefined && this.getValidParam(fil['id_mascota']))).subscribe(params => {
			this.id_mascota = params['id_mascota'];
			this.app_srv.getCombosByMascota(params['id_mascota']);
		 });
		this.sub_data_opt = this.app_srv.combos_mascota.subscribe(res => {
			this.data_opt = res;
		});

		this.sub_data_sabores = this.app_srv.sabores_x_mascota.pipe(filter(fil => fil != null)).subscribe(res => {
			this.tastes = res;
		});
		this.sub_data_sabores = this.app_srv.beneficio_x_mascota.pipe(filter(fil => fil != null)).subscribe(res => {
			console.log(res);
			this.benefice = res;
		});
	}

	ngOnDestroy(): void {
		this.sub_data_opt.unsubscribe();
		this.sub_params.unsubscribe();
		this.sub_data_sabores.unsubscribe();
	}

	redirect() {
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
	}

	goToStep(step:number = null) {

		if(!step && this.last_step) {
			this.step = this.last_step;
			return;
		}

		this.step = step;
		if (step == 2) {
			this.getSaborPorMascota();
		}
		if(step == 3) {
			this.getBeneficioPorMascota();
		}
	}

	enableItem(item) {
	}

	tastesSelect() {
		if (!this.tastes) return false;
		return this.tastes.filter(res => res.enable).length > 0 ? false : true;
	}


	beneficeSelect() {
		if (!this.benefice) return false;
		return this.benefice.filter(res => res.enable).length > 0 ? false : true;
	}

	resumeData():void {
		this.last_step   = 2;
		this.step        = 5;
		let obj = {
			id_mascota : this.id_mascota,
			...this.formDetail.value,
			sabores_selected : this.tastes.filter(res => res.enable)
		}
		this.filterData = null;
		this.app_srv.getDataScraperBySite(obj).subscribe(res => {
			this.filterData  = res;
		});
	}

	dataBenefice() {
		this.last_step   = 3;
		this.step        = 5;
		let obj = {
			id_mascota : this.id_mascota,
			...this.formDetail.value,
			sabores_selected : this.benefice.filter(res => res.enable)
		}
		this.filterData = null;
		this.app_srv.getDataScraperBySite(obj).subscribe(res => {
			this.filterData  = res;
		});
	}

	getSaborPorMascota():void {
		let obj:any = {
			id_mascota : this.id_mascota
		};

		this.app_srv.getSaborPorMascota(obj);
	}

	getBeneficioPorMascota():void {
		let obj:any = {
			id_mascota : this.id_mascota
		};

		this.app_srv.getBeneficioPorMascota(obj);
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
// 	}
// }

