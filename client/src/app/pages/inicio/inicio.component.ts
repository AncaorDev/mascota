import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
	constructor(
		private app_srv:AppService,
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
	}

	redirect() {
		console.log('redirect');
	}

	viewComparativa(id_mascota:string) {
		// this.app_srv.getCombosByMascota(id_mascota);
		this._router.navigate(['/comparativa',id_mascota], { relativeTo: this._activatedRoute });
		// routerLink="/comparativa", routerLinkActive="active"
	}
}
