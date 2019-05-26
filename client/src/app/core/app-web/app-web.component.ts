import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
	selector: 'app-web',
	templateUrl: './app-web.component.html',
	styleUrls: ['./app-web.component.scss']
})
export class AppWebComponent implements OnInit {
	url_router:string;
	is_admin:boolean;
	constructor( private _router: Router,) {
		_router.events.subscribe( (event: Event) => {
            // console.log(event);
            if (event instanceof NavigationStart) {
				this.url_router = event.url.split('/')[1];
				console.log(this.url_router);
				this.is_admin = (this.url_router == 'admin') ? true : false;
            }
            if (event instanceof NavigationEnd) {
                // Hide loading indicator
            }
            if (event instanceof NavigationError) {
                // Present error to user
            }
        });
	}

	ngOnInit() {
		// console.log(this.url_router);
	}

}
