import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public url = 'http://localhost:3000/messages';
  constructor(private http: HttpClient) { }

  sendMessageToBot(message: string): Observable<any> {
    return this.http.post(this.url, {message}).
      pipe(response  => {
        return response;
      });
  }
}
