import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ToranimComponent } from '../components/toranim/toranim.component';
import { ScheduleComponent } from '../components/schedule/schedule.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'toranim', component: ToranimComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: '**', redirectTo: '/home' }
];
