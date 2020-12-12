import { FirestoreModule } from './firestore/firestore.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    FirestoreModule
  ],
  exports: [
    HttpClientModule,
    AuthModule,
    FirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: HttpSuccessInterceptor,
  //     multi: true
  //   }
  // ]
})
export class CoreModule { }
