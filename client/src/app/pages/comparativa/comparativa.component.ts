import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Globals } from 'src/app/shared/globals';
import { ERecomendacion } from './comparativa.model';
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
	sub_user:Subscription = new Subscription();
	filterData:any;
	data_alterna:any;
	step:number = 0;
	super_pet:any;
	sabor:boolean = false;
	beneficios:boolean = false;
	resume= false;
	id_mascota:string = null;
	tastes:any;
	benefice:any;
	type_reco:number;
	last_step:number;
	mark:FormControl = new FormControl();
	web_site:FormControl = new FormControl();
	user:any;
	marcas:any = [];
	webs:any = [];
	recomendacion:any;
	constructor(
		private _app_srv:AppService,
		private route: ActivatedRoute,
		private form_build:FormBuilder,
		public _globals:Globals
	) {}

	ngOnInit(): void {
		this.formDetail = this._builderForm();

		this.sub_params = this.route.params.pipe(filter(fil=> fil['id_mascota'] != undefined && this.getValidParam(fil['id_mascota']))).subscribe(params => {
			this.id_mascota = params['id_mascota'];
			this._app_srv.getCombosByMascota(params['id_mascota']);
		 });
		this.sub_data_opt = this._app_srv.combos_mascota.subscribe(res => {
			this.data_opt = res;
		});

		this._app_srv.getTypeRecommendation({}).subscribe(res => {
			this.recomendacion = res;
		})
		this.sub_data_sabores = this._app_srv.sabores_x_mascota.pipe(filter(fil => fil != null)).subscribe(res => {
			this.tastes = res;
		});
		this.sub_data_sabores = this._app_srv.beneficio_x_mascota.pipe(filter(fil => fil != null)).subscribe(res => {
			this.benefice = res;
		});
		this.mark.valueChanges.subscribe(res => {
			this.filterData = this.data_alterna;
			if(!res) return;
			if(res.length == 0) {
				return;
			}
			if(this.filterData && res && res.length > 0) {
				this.filterData = this.filterData.filter(row => {
					return res.includes(row.marca)
				});
			}
		});
		this.web_site.valueChanges.subscribe(res => {
			this.filterData = this.data_alterna;
			if(!res) return;
			if(res.length == 0) {
				return;
			}
			if(this.filterData && res && res.length > 0) {
				this.filterData = this.filterData.filter(row => {
					return res.includes(row.desc_site)
				});
			}
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
		if(step == null && this.last_step) {
			this.step = this.last_step;
			this.mark.setValue(null);
			this.web_site.setValue(null);
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

	dataSabor():void {
		this.last_step   = 2;
		this.step        = 5;
		let obj = {
			...this.formDetail.value,
			id_mascota 	  : parseInt(this.id_mascota),
			selected 	  : this.tastes.filter(res => res.enable),
			recomendacion : this.type_reco,
			token         : localStorage.getItem('token')
		};
		this.filterData = null;
		this._app_srv.getDataScraperBySite(obj).subscribe(res => {
			this.filterData = res.data;
			this.marcas     = res.marcas;
			this.webs       = res.webs;
		});
	}

	dataBenefice():void {
		this.last_step   = 3;
		this.step        = 5;
		let obj = {
			...this.formDetail.value,
			id_mascota 	   : parseInt(this.id_mascota),
			selected       : this.benefice.filter(res => res.enable),
			recomendacion  : this.type_reco,
			token          : localStorage.getItem('token')
		}
		this.filterData = null;
		this._app_srv.getDataScraperBySite(obj).subscribe(res => {
			this.filterData = res.data;
			this.marcas     = res.marcas;
			this.webs       = res.webs;
		});
	}

	getSaborPorMascota():void {
		let obj:any = {
			id_mascota : this.id_mascota
		};

		this._app_srv.getSaborPorMascota(obj);
	}

	getBeneficioPorMascota():void {
		let obj:any = {
			id_mascota : this.id_mascota
		};

		this._app_srv.getBeneficioPorMascota(obj);
	}
}