import { MessageService } from 'src/app/shared/services/snackbar/message.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpSuccessInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MessageService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // won't work with firebase;
    // grants immutability to the request
    const request = req.clone();
    console.log(request);

    this.snackBar.open('Sucesso!', MessageLevel.SUCCESS);

    throw new Error('Method not implemented.');
  }
}
