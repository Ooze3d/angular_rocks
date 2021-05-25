import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { AddComponent } from './main/add/add.component';
import { EditComponent } from './main/edit/edit.component';
import { BandComponent } from './main/band/band.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { RockBandService } from './rockband.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddComponent,
    EditComponent,
    BandComponent,
    PageNotFoundComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatDividerModule,
    HttpClientModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatExpansionModule
  ],
  providers: [
    RockBandService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
