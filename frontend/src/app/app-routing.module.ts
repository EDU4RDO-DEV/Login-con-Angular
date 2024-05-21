import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path: '', redirectTo: '/inicio', pathMatch: 'full'}, // Si la ruta es vacía, redirige a /inicio
  {path: 'inicio', component:DashboardComponent},
  {path: 'iniciar-sesion', component:LoginComponent},
  {path: 'usuarios', component:UserComponent} // Agrega una ruta para tu componente de usuarios aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }