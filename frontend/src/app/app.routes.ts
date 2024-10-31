import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GraficComponent } from './components/grafic/grafic.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'mapa', component: MapaComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'grafic', component: GraficComponent},
    {path: '**', redirectTo: ''}
];
