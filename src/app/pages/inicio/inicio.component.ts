import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'app-inicio',
	templateUrl: './inicio.component.html',
	styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
	constructor() { }

	ngOnInit() {
	}

	redirect() {
		console.log('redirect');
	}
}
