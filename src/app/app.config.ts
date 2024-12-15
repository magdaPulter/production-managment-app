import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environment/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
    ]),
  ],
};
