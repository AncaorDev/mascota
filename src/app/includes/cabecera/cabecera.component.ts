import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
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
	constructor() { }

	ngOnInit() {
		this.cabecera  = document.getElementById('cabecera');
	}

	ngAfterViewInit() {

	}

	@HostListener("window:scroll", ['event'])
	onWindowScroll(event: Event) {
		let heightCab = this.cabecera.clientHeight;
		let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if (this.fixed)  this.fixed = (scrollTop == 0) ? false : true;
		else this.fixed = (scrollTop > heightCab) ? true : false;
    }
}
