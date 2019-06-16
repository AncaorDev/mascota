import { Component, Input, OnChanges, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Globals } from '../globals';
@Component({
  selector: 'cs-mat-icon',
  templateUrl: './cs-mat-icon.component.html',
  styleUrls: ['./cs-mat-icon.component.scss']
})

export class CsMatIconComponent implements OnChanges{
	@Input() icon:string;
	@Input() size?:string;
	@Input() inline?:boolean = false;
	@Input() color?:string = '';
	@ViewChild('id_icon') el_icon;

	constructor(private mdIconRegistry: MatIconRegistry,
				private sanitizer: DomSanitizer
	) {

	}

	ngOnChanges() {
		this.icon &&
			this.mdIconRegistry.addSvgIcon(this.icon, this.sanitizer.bypassSecurityTrustResourceUrl(Globals.ICONS[this.icon])),
			this.loadProperties();
	}

	loadProperties() {
		if (this.size) {
			this.el_icon._elementRef.nativeElement.style.width  = `${this.size}`,
			this.el_icon._elementRef.nativeElement.style.height = `${this.size}`;
		}
	}
}
// const style = document.documentElement.style;