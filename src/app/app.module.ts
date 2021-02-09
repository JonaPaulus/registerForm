import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ItemTilesComponent } from './item-tiles/item-tiles.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpFormComponent,
    NavigationBarComponent,
    FooterComponent,
    ItemTilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
