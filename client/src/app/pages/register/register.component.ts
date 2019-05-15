import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, ViewEncapsulation, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from 'src/app/shared/globals';
import { AuthService } from 'src/app/auth/auth.service';
import { AppService } from 'src/app/app.service';

var colorTmp: string = '';

@Component({
    selector: 'cs-register',
    templateUrl: 'register.component.html',
    styles: [`
        mat-form-field.mat-focused .mat-form-field-label {
            color : ${colorTmp} !important;
        }
        .mat-form-field-ripple {
            background-color: ${colorTmp} !important;
        }
        .mat-nav-list .mat-list-item:hover {
            background: ${colorTmp} !important;
        }
    `],
    providers: [MediaMatcher, AuthService],
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./register.component.scss'],
})

export class RegisterComponent implements OnInit {
    mobileQuery: MediaQueryList;
    hide = true;
    showProgress: boolean = false;
    form:FormGroup = null;
    usernameInput = document.querySelector('.username')

    showPasswordButton = document.querySelector('.password-button')
    face = document.querySelector('.face')
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _media: MediaMatcher,
        private _formBuilder: FormBuilder,
        private _router: Router,
        public _globals:Globals,
        private _authService : AuthService,
        private _app_srv : AppService
    ) {
        this.form = this._builderForm();
        // this.setMediaQuery();
    }

    ngOnInit():void {

    }

    ngOnDestroy(): void {
        // this.mobileQuery && this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    private _builderForm() {
        let usuario = '^[a-zA-Z0-9._@\-]*$';
        let form = this._formBuilder.group({
            nom_persona   : [null, [Validators.required,Validators.maxLength(50)]],
            ape_pate_pers : [null, [Validators.required,Validators.maxLength(50)]],
            ape_mate_pers : [null, [Validators.required,Validators.maxLength(50)]],
            username      : ['', [Validators.required, Validators.pattern(usuario), Validators.minLength(5), Validators.maxLength(50)]],
            password      : ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
        });
        return form;
    }

    submit():void {
        this._authService.register(this.form.value).subscribe(data => {
            console.log(data);
        },err => {
            console.log(err);
        });
    }

    register(): void {
        this._authService.register(this.form.getRawValue()).subscribe(res => {
            console.log(res);
            this._app_srv.user.next(res.data);
            localStorage.setItem('token', res.token);
            this._router.navigate(['/']);
        },err => {
            console.log('err',err);
        });
    }

    /**Getters */
    get nom_persona() { return this.form.controls['nom_persona'];}
    get ape_pate_pers() { return this.form.controls['ape_pate_pers'];}
    get ape_mate_pers() { return this.form.controls['ape_mate_pers'];}
    get username() { return this.form.controls['username']; }
    get password() { return this.form.controls['password']; }


}