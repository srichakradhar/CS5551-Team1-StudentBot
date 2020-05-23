import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  public url = "http://localhost:3000/messages";
  public boturl = "http://localhost:3000/botresponse";
  private storageSub = new BehaviorSubject<String>("");
  constructor(private http: HttpClient) {}

  sendMessageToBot(message: string): Observable<any> {
    return this.http.post(this.url, { message }).pipe((response) => {
      return response;
    });
  }

  getBotResponse(): Observable<any> {
    return this.http.get(this.boturl).pipe((response) => {
      return response;
    });
  }

  watchStorage(): Observable<any> {
    console.log("Get");
    return this.storageSub.asObservable();
  }

  setItem(key: string, data: any) {
    localStorage.setItem(key, data);
    console.log("Set");
    this.storageSub.next("changed");
  }

  testUrlCanLoad(url) {
    console.log(url);
    return this.http.get(url);
  }
}
