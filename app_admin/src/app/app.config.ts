import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// required for navigating routes and loading new pages
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), provideAnimationsAsync(), provideCharts(withDefaultRegisterables())
  ]
};
