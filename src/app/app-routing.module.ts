import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard-service.service';

const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'about-us',
        loadChildren: () => import('./modules/about-us/about-us.module').then(m => m.AboutUsModule),
    },
    {
        path: 'ads',
        loadChildren: () => import('./modules/ads/ads.module').then(m => m.AdsModule),
        canActivate: [AuthGuardService]

    },
    {
        path: 'contact',
        loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule),
        canActivate: [AuthGuardService]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
