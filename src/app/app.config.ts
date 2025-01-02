import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environment/environment.prod';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    importProvidersFrom([
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireAuthModule,
    ]),
    provideAnimationsAsync(),
  ],
};
