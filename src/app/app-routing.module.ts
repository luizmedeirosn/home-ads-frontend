import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule ),
    },
    {
        path: 'about-us',
        loadChildren: () => import('./modules/about-us/about-us.module').then( m => m.AboutUsModule ),
    },
    {
        path: 'contact',
        loadChildren: () => import('./modules/contact/contact.module').then( m => m.ContactModule)
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
