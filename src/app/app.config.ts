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
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthReducer } from './store/auth-store/reducers';
import { AuthEffects } from './store/auth-store/effects';
import { provideEffects } from '@ngrx/effects';
import { ProductionEffects } from './store/production-store/effects';
import { ProductionReducer } from './store/production-store/reducers';
import { ProductionItemsReducer } from './store/productionItems-store/reducers';

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
    provideStore({
      auth: AuthReducer,
      production: ProductionReducer,
      productionItems: ProductionItemsReducer,
    }),
    provideStoreDevtools({ maxAge: 25 }),
    provideEffects([AuthEffects, ProductionEffects]),
  ],
};
