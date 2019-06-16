import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AppService } from '../app.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	users:any = [];
	constructor( private _app_srv:AppService) { }

  	ngOnInit() {

  	}

}
