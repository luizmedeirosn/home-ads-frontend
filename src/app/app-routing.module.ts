import { HomePageComponent } from './modules/home/page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    {
        path: '',
        component: HomePageComponent,
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule ),
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
