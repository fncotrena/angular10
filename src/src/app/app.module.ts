import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
//import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {MaterialModule} from './material/material.module';

import { MatDatepickerModule } from '@angular/material/datepicker';

//import {MatMomentDateModule} from '@angular/material-moment-adapter';


//import { MascotEditComponent } from './mascot-edit/mascot-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
   
    
    
   // MascotEditComponent,
  //  ListMascotaComponent
  ],
  
  imports: [
    RouterModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    MaterialModule,
    MatDatepickerModule,
    //MatMomentDateModule,
    

   // AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
