import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, ViewEncapsulation, Input, ElementRef } from '@angular/core';
// import { SharedConstants } from '../../../shared/shared.constants';
import { MediaMatcher } from '@angular/cdk/layout';
// import { AuthService } from '../../../core/providers/session/auth.service';
// import { CsGhostComponentService } from '../../../shared/components/cs-ghost-loading/cs-ghost-loading.component';
// import { MatSnackBar } from '@angular/material';
// import { CsForgotUserModalComponent } from '../../components/cs-forgot-user-modal/cs-forgot-user-modal.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { Globals } from '../../../globals';
// import { AppService } from '../../../app.service';
import { Router } from '@angular/router';
import { Globals } from 'src/app/shared/globals';
import { AuthService } from 'src/app/auth/auth.service';
import { AppService } from 'src/app/app.service';
/** Helpers */
// import { only_one_espace, __messageSnackBar } from '../../../shared/helpers/utils';
// import { DeviceDetectorService } from 'ngx-device-detector';
// import { LocalStorageService } from '../../../shared/providers/storage/local-storage.service';
// import { User } from 'app/main/models/user.model';
// import { DATA_LOGIN } from 'app/main/models/general.model';

var colorTmp: string = '';

@Component({
    selector: 'cs-login',
    templateUrl: 'login.component.html',
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
    styleUrls: ['./../register/register.component.scss'],
})

export class LoginComponent implements OnInit {

    // showFailedLogin: boolean;
    // showNoConnection: boolean;
    // @Input() color: string = '';
    // @ViewChild('formColor') formColor: TemplateRef<any>;
    // @ViewChild('input_pass') input_pass:ElementRef;
    // private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    // primary: string = '';
    // secondary: string = '';
    // light: string = '';
    // userCache: any;
    // SharedConstants.ICONS.RUTA_IMG_LOGIN
    // SMILEDU_ICO: string = SharedConstants.ICONS.SMILEDU_ICO;
    // CHRISMAS: string = SharedConstants.ICONS.CHRISMAS;
    // LOVE_SCHOOL: string = SharedConstants.ICONS.LOVE_SCHOOL;
    // VALENTINE: string = SharedConstants.ICONS.VALENTINE;
    // UNKNOWN_USER_IMAGE: string = SharedConstants.PATHS.UNKNOWN_USER_IMAGE;
    // ICON_FACEBOOK: string = SharedConstants.ICONS.ICON_FACEBOOK;
    // ICON_GOOGLE: string = SharedConstants.ICONS.ICON_GOOGLE;
    // ICON_OUTLOOK: string = SharedConstants.ICONS.ICON_OUTLOOK;
    // MESSAGE_HELP: string = SharedConstants.ICONS.MESSAGE_HELP;
    // WEB_SMILEDU: string = '';
    // LOGO_COLEGIO: string = '';
    // ESCUDO_COLE_PATH: string = '';
    // isSkeletonPage: boolean = false;
    hide = true;
    // collegePage: any;
    // usernameControl: FormControl;
    // newUserForm: FormGroup;
    // usuario: string;
    // pass: string;
    // metadata: any;
    // msj_error: string;
    // invalidForm: boolean;
    // pagInicio: string;
    // foto: any;
    // msg_login: any;
    // usersTmp: any = [];
    // isActive: boolean = true;
    // mostrar: boolean = true;
    showProgress: boolean = false;
    // headerColor: string;
    // color_progres: string;
    // name_colegio: string = 'Smiledu';
    form:FormGroup = null;

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

    // setMediaQuery() {
    //     this.mobileQuery = this._media.matchMedia('(max-width: 767px)');
    //     this._mobileQueryListener = () => this._changeDetectorRef.detectChanges();
    //     this.mobileQuery.addListener(this._mobileQueryListener);
    // }

    // selectUser(user) {
    //     this.mostrar = false;
    //     this.userCache = user;
    //     this.usermane.setValue(user.email);
    // }

    ngOnInit():void {
        let passwordInput = document.querySelector('.password');
        let usernameInput = document.querySelector('.user_name');
        let face:any = document.querySelector('.face')

        passwordInput.addEventListener('focus', event => {
            document.querySelectorAll('.hand').forEach(hand => {
              hand.classList.add('hide')
            })
            document.querySelector('.tongue').classList.remove('breath')
        });

        passwordInput.addEventListener('blur', event => {
            document.querySelectorAll('.hand').forEach(hand => {
                hand.classList.remove('hide')
                hand.classList.remove('peek')
            })
            document.querySelector('.tongue').classList.add('breath')
        });

        passwordInput.addEventListener('blur', event => {
            document.querySelectorAll('.hand').forEach(hand => {
                hand.classList.remove('hide')
                hand.classList.remove('peek')
            })
            document.querySelector('.tongue').classList.add('breath')
        });

        usernameInput.addEventListener('focus', event => {
            let length = Math.min(this.username.value.length - 16, 19)
            document.querySelectorAll('.hand').forEach(hand => {
                hand.classList.remove('hide')
                hand.classList.remove('peek')
            });

            face.style.setProperty('--rotate-head', `${-length}deg`)
        });

        usernameInput.addEventListener('blur', event => {
            face.style.setProperty('--rotate-head', '0deg')
        });
    }

    private _builderForm() {
        let usuario = '^[a-zA-Z0-9._@\-]*$';
        let form = this._formBuilder.group({
            username: ['', [Validators.required, Validators.pattern(usuario), Validators.minLength(5), Validators.maxLength(50)]],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])]
        });
        return form;
    }

    ngOnDestroy(): void {
    }


    login(): void {
        this.showProgress = true;
        // let user_repeat = false;
        if (this.username.invalid || this.password.invalid) {
            this.showProgress = false;
            return;
        }
        this.username.disable();
        this.password.disable();
        this._authService.login(this.form.getRawValue()).subscribe(res => {
            this._app_srv.user.next(res.data);
            localStorage.setItem('token', res.token);
            this._router.navigate(['/']);
        },err => {
            console.log('err',err);
        });
    }

    /**Getters */
    get username() { return this.form.controls['username']; }
    get password() { return this.form.controls['password']; }
    /*
    Inspired by: "Login Page & Homepage"
    By: Neo
    Link: https://dribbble.com/shots/4485321-Login-Page-Homepage
    */

    ShowHidePass() {
        this.hide = !this.hide;
        if (this.hide) {
            document.querySelectorAll('.hand').forEach(hand => {
            hand.classList.remove('peek')
            hand.classList.add('hide')
            })
        } else {
            document.querySelectorAll('.hand').forEach(hand => {
            hand.classList.remove('hide')
            hand.classList.add('peek')
            })
        }
    }
}