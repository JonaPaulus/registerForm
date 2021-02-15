import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

/* components */
import { AppComponent } from './app.component';
import { SignUpFormComponent } from '@components/sign-up-form/sign-up-form.component';
import { NavigationBarComponent } from '@components/navigation-bar/navigation-bar.component';
import { FooterComponent } from '@components/footer/footer.component';
import { ItemTilesComponent } from '@components/item-tiles/item-tiles.component';

/* Services */
import { UserApiService } from '@api/user.service';

/* Material Design */
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [UserApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
