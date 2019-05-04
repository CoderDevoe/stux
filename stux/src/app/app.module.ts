import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AmplifyAngularModule, AmplifyService, AmplifyModules } from 'aws-amplify-angular';
// import Auth from '@aws-amplify/auth';
import Interactions from '@aws-amplify/interactions';
// import Storage from '@aws-amplify/storage';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FlexLayoutModule,
    AmplifyAngularModule
  ],
  providers: [{
    provide: AmplifyService,
    useFactory: () => {
      return AmplifyModules({
        Interactions
      });
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
