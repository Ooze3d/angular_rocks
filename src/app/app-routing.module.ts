import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddComponent } from './main/add/add.component';
import { EditComponent } from './main/edit/edit.component';
import { BandComponent } from './main/band/band.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    { path: 'main', component: MainComponent }, //See bands list
    { path: 'main/band/:idband', component: BandComponent }, //See band by ID
    { path: 'main/band/:idband/edit', component: EditComponent}, //Edit band by ID
    { path: 'main/add', component: AddComponent}, //Add new band
    { path: 'main/about', component: AboutComponent}, //Add new band
    { path: '**', component: PageNotFoundComponent}, //Wildcard route
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}