import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
	constructor(
		private _router: Router,
		private _activatedRoute: ActivatedRoute
	) { }

	ngOnInit(): void {
	}

	redirect() {
		console.log('redirect');
	}

	viewComparativa(id_mascota:string) {
		this._router.navigate(['/comparativa',id_mascota], { relativeTo: this._activatedRoute });
	}
}
