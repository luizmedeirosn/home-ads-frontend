import { Routes } from "@angular/router";
import { AdsHomeComponent } from "./page/ads-home/ads-home.component";
import { AdViewComponent } from "./components/ad-view/ad-view.component";

export const ADS_ROUTES: Routes = [
    {
        path: '',
        component: AdsHomeComponent,
    },
    {
        path: 'view',
        component: AdViewComponent
    }
];
