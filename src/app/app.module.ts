import { environment } from './../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NotFoundModule } from './modules/not-found/not-found.module';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NotFoundModule,
    LoginModule,
    CoreModule,
    MainModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({maxAge: 100, logOnly: environment.production}),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
