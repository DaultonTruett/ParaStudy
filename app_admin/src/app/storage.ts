import { InjectionToken } from '@angular/core';

export class Storage {
    constructor(){};
};

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});
