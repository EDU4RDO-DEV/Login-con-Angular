import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { StudentComponent } from './components/student/student.component';

const routes: Routes = [
  { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'iniciar-sesion', component: LoginComponent },
  { path: 'usuarios', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'estudiantes', component: StudentComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }