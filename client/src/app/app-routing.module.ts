import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ComparativaComponent } from './pages/comparativa/comparativa.component';
import { LoginComponent } from './pages/login/login.component';
import { RecomendacionComponent } from './pages/recomendacion/recomedacion.component';
import { RegisterComponent } from './pages/register/register.component';

const ROUTES: Routes = [
    { path: '', component: InicioComponent },
    { path: 'comparativa', component : ComparativaComponent},
    { path: 'recomendacion', component : RecomendacionComponent},
    { path: 'comparativa/:id_mascota', component : ComparativaComponent},
    { path: 'login', component : LoginComponent},
    { path: 'register', component : RegisterComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }