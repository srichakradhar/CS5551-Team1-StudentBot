import { MapComponent } from './components/map/map.component';
import { ResponsePageIframeComponent } from './pages/response-page-iframe/response-page-iframe.component';
import { MainComponent } from './pages/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path : 'home',
    component: MainComponent
  },
  {
    path: 'result',
    component: ResponsePageIframeComponent
  },
  {
    path: 'about',
    component: ResponsePageIframeComponent
  },
  {
    path: 'maps',
    component: MapComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
