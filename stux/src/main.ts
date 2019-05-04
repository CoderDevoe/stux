import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, { Interactions } from 'aws-amplify';
import awsmobile from './aws-exports';
Amplify.configure(awsmobile);

Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:355708db-ecf0-45a7-8ddf-31addc78ad53',
    region: 'us-east-1'
  },
  Interactions: {
    bots: {
      "callcenter": {
        "name": "callcenter",
        "alias": "$LATEST",
        "region": "us-east-1",
      },
    }
  }
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
