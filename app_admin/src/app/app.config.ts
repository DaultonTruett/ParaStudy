import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// required for navigating routes and loading new pages
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
