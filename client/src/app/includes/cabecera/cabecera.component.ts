import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { filter } from 'rxjs/operators';
import { Globals } from 'src/app/shared/globals';

@Component({
	selector: 'app-cabecera',
	templateUrl: './cabecera.component.html',
	styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit, OnDestroy {
	pages: any = [
					{ title: 'Inicio' },
					{ title: 'Quienes somos' },
					{ title: 'Galeria' },
					{ title: 'Directorio' },
					{ title: 'Donaciones' },
					{ title: 'Contacto' }
				];
	fixed: boolean = false;
	cabecera: any;
	sub_user:Subscription = new Subscription();
	user:any = null;
	constructor(
		private _app_srv : AppService,
		public _globals:Globals
	) { }

	ngOnInit():void {
		this.cabecera  = document.getElementById('cabecera');
		if(localStorage.getItem('data_user')) {
			this.user = JSON.parse(localStorage.getItem('data_user'));
			this._globals.__DATA_USER = JSON.parse(localStorage.getItem('data_user'));
		}
		this.sub_user  = this._app_srv.user.pipe(filter(fil => fil.id_persona != null)).subscribe(res => {
			localStorage.setItem('data_user', JSON.stringify(res));
			this._globals.__DATA_USER = JSON.parse(localStorage.getItem('data_user'));
			this.user = res;
		});
	}

	ngOnDestroy():void {
		this.sub_user.unsubscribe();
	}

	cerrarSesion() {
		localStorage.clear();
		this._globals.__DATA_USER = null;
		this.user = null;
	}
	@HostListener("window:scroll", ['event'])
	onWindowScroll(event: Event) {
		// let heightCab = this.cabecera.clientHeight;
		// let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		// if (this.fixed)  this.fixed = (scrollTop == 0) ? false : true;
		// else this.fixed = (scrollTop > heightCab) ? true : false;
    }
}
