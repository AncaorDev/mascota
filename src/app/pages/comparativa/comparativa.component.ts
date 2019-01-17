import { Component, OnInit, HostListener } from '@angular/core';

@Component({
	selector: 'app-comparativa',
	templateUrl: './comparativa.component.html',
	styleUrls: ['./comparativa.component.scss']
})
export class ComparativaComponent implements OnInit {

	lista:any = [{value:1, viewValue: "Opción 1"}]

	constructor() { }

	ngOnInit() {
	}

	redirect() {
		console.log('redirect');
	}
}
