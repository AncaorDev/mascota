import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AppWebComponent } from './core/app-web/app-web.component';
// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material
import { MaterialModule } from './app.material';
import { CabeceraComponent } from './includes/cabecera/cabecera.component';
import { LoadingWebComponent } from './loading/loading.component';
import { Globals } from './shared/globals';
import { HttpClientModule } from '@angular/common/http';
import { CsMatIconComponent } from './shared/cs-mat-icon/cs-mat-icon.component';
import { ComparativaComponent } from './pages/comparativa/comparativa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecomendacionComponent } from './pages/recomendacion/recomedacion.component';
import { LoginComponent } from './pages/login/login.component';
import { HeadersService } from './core/header.service';
import { AppService } from './app.service';
import { RegisterComponent } from './pages/register/register.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ComponentsModule } from './components/components.module';

// Dependencias
import {
	SocialLoginModule,
	AuthServiceConfig,
	GoogleLoginProvider,
	FacebookLoginProvider,
	// LinkedinLoginProvider
  } from "angular-6-social-login";

  // Configs
export function getAuthServiceConfigs() {
	let config = new AuthServiceConfig(
		[
		  {
			id: FacebookLoginProvider.PROVIDER_ID,
			provider: new FacebookLoginProvider("373122450211904")
		  },
		  {
			id: GoogleLoginProvider.PROVIDER_ID,
			provider: new GoogleLoginProvider("944641015536-umthl7gjroahctuiblatj6vpvsc308eq.apps.googleusercontent.com")
		  }
		  /*,
			{
			  id: LinkedinLoginProvider.PROVIDER_ID,
			  provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
			},*/
		]
	);
	return config;
  }
@NgModule({
  	declarations: [
		AppComponent,
		InicioComponent,
		ComparativaComponent,
		AppWebComponent,
		CabeceraComponent,
		LoadingWebComponent,
		CsMatIconComponent,
		RecomendacionComponent,
		LoginComponent,
		RegisterComponent,
		AdminLayoutComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		ComponentsModule,
		SocialLoginModule
	],
	providers: [
		Globals,
		HeadersService,
		AppService,
		{
			provide : AuthServiceConfig,
			useFactory : getAuthServiceConfigs
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
