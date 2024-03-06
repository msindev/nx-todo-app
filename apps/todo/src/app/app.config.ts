import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TasksService } from '@nx-todo-app/openapi-generated';
import { appRoutes } from './app.routes';
import { TodoEffects } from './store/todo/todo.effects';
import { todoReducer } from './store/todo/todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects([TodoEffects]),
    provideStore({ tasks: todoReducer }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    TasksService,
  ],
};
