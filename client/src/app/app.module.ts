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
		RegisterComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [Globals,HeadersService,AppService],
	bootstrap: [AppComponent]
})
export class AppModule { }
