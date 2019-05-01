import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ComparativaComponent } from './pages/comparativa/comparativa.component';
import { LoginComponent } from './pages/login/login.component';

const ROUTES: Routes = [
    { path: '', component: InicioComponent },
    { path: 'comparativa', component : ComparativaComponent},
    { path: 'login', component : LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule]
})
export class AppRoutingModule { }