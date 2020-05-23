import { style } from "@angular/animations";
import { MessageService } from "./../../services/message.service";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-response-page-iframe",
  templateUrl: "./response-page-iframe.component.html",
  styleUrls: ["./response-page-iframe.component.css"],
})
export class ResponsePageIframeComponent implements OnInit {
  public siteUrl: any;
  public origin: any;
  public destination: any;
  @ViewChild("iframe") iframe: ElementRef;
  constructor(
    private msgService: MessageService,
    protected sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const self = this;
    this.iframe.nativeElement.onload = function () {
      const header = self.iframe.nativeElement.contentDocument.getElementsByClassName(
        "header"
      );
      const footer = self.iframe.nativeElement.contentDocument.getElementsByClassName(
        "footer"
      );
      const chatbot = self.iframe.nativeElement.contentDocument.getElementsByClassName(
        "chatbot"
      );
      if (header.length > 0) {
        header[0].style.display = "none";
      }
      if (footer.length > 0) {
        footer[0].style.display = "none";
      }
      if (chatbot.length > 0) {
        chatbot[0].style.display = "none";
      }
    };
    this.msgService.watchStorage().subscribe((message) => {
      const siteUrl = localStorage.getItem("url");
      this.checkForSameOriginError(siteUrl);
    });
  }

  checkForSameOriginError(url) {
    this.msgService.testUrlCanLoad(url).subscribe(
      (result) => {
        this.siteUrl = url;
        console.log("Success");
      },
      (err) => {
        if (err.status === 200) {
          this.siteUrl = url;
        } else {
          this.siteUrl = "pathway";
        }
      }
    );
  }
}
