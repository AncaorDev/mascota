import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, ViewEncapsulation, Input } from '@angular/core';
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

    // showFailedLogin: boolean;
    // showNoConnection: boolean;
    // @Input() color: string = '';
    // @ViewChild('formColor') formColor: TemplateRef<any>;
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
    // valUser() {
    //     this.mostrar = true;
    //     // this.usermane.setValue(only_one_espace(this.usermane.value));
    //     if (this.usermane.value != this.usuario) {
    //         this.msj_error = null;
    //     }
    // }

    // valPass() {
    //     // this.password.setValue(only_one_espace(this.password.value));
    //     if (this.password.value != this.pass) {
    //         this.msj_error = null;
    //     }
    // }

    /**Getters */
    get nom_persona() { return this.form.controls['nom_persona'];}
    get ape_pate_pers() { return this.form.controls['ape_pate_pers'];}
    get ape_mate_pers() { return this.form.controls['ape_mate_pers'];}
    get username() { return this.form.controls['username']; }
    get password() { return this.form.controls['password']; }

    // setColor(color: string) {
    //     this.primary = color;
    //     colorTmp = this.primary;
    //     this.isSkeletonPage = true;
    // }

    // value = 0;
    // interval: any;
    // isIntro: boolean = false;
    // showWelcome() {
    //     this.interval = setInterval(() => {
    //         this.value++;
    //         if (this.value > 100) {
    //             clearInterval(this.interval);
    //             this.isIntro = true;
    //         }
    //     }, 30);
    // }

    // filter: boolean;
    // valueInput: string = "";

    // write() {
    //     if (this.usermane.value.length == 0) {
    //         this.filter = false;
    //     } else {
    //         this.filter = true;
    //     }
    // }

    // ingresar() {
    //     // if (only_one_espace(this.password.value).length >= 6) {
    //     //     this.login();
    //     // }
    // }
/*
  Inspired by: "Login Page & Homepage"
  By: Neo
  Link: https://dribbble.com/shots/4485321-Login-Page-Homepage
*/





// passwordInput.addEventListener('blur', event => {
//   document.querySelectorAll('.hand').forEach(hand => {
//     hand.classList.remove('hide')
//     hand.classList.remove('peek')
//   })
//   document.querySelector('.tongue').classList.add('breath')
// })

// usernameInput.addEventListener('focus', event => {
//   let length = Math.min(usernameInput.value.length - 16, 19)
//   document.querySelectorAll('.hand').forEach(hand => {
//     hand.classList.remove('hide')
//     hand.classList.remove('peek')
//   })
  
//   face.style.setProperty('--rotate-head', `${-length}deg`)
// })

// usernameInput.addEventListener('blur', event => {
//   face.style.setProperty('--rotate-head', '0deg')
// })
  
// usernameInput.addEventListener('input', _.throttle(event => {
//   let length = Math.min(event.target.value.length - 16, 19)
  
//   face.style.setProperty('--rotate-head', `${-length}deg`)
// }, 100))

// showPasswordButton.addEventListener('click', event => {
//   if (passwordInput.type === 'text') {
//     passwordInput.type = 'password'
//     document.querySelectorAll('.hand').forEach(hand => {
//       hand.classList.remove('peek')
//       hand.classList.add('hide')
//     })
//   } else {
//     passwordInput.type = 'text'
//     document.querySelectorAll('.hand').forEach(hand => {
//       hand.classList.remove('hide')
//       hand.classList.add('peek')
//     })
//   }
// })
}