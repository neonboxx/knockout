import { ComponentRef, enableProdMode, ReflectiveInjector } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

// core
import { AUTH_PROVIDERS, AuthRouteHelper } from './core/auth';
import { FIREBASE_APP_PROVIDERS } from './core/firebase';
import { PLAYER_PROVIDERS } from './core/player';

// root component
import { App } from './views/app';

// common styles
import './views/common/styles.scss';


if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}


const providers: any[] = [
  AUTH_PROVIDERS,
  FIREBASE_APP_PROVIDERS,
  ROUTER_PROVIDERS,
  PLAYER_PROVIDERS
];


bootstrap(App, providers)
  .then((appRef: ComponentRef<App>) => {
    AuthRouteHelper.injector(appRef.injector as ReflectiveInjector);
  })
  .catch((error: Error) => console.error(error));
