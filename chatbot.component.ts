import { MessageService } from "./../services/message.service";
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
  ViewEncapsulation,
} from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { Router } from "@angular/router";

import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger("openClose", [
      // ...
      state(
        "open",
        style({
          opacity: 1,
          bottom: "60px",
          right: "40px",
        })
      ),
      state(
        "closed",
        style({
          opacity: 1,
          bottom: "10px",
          right: "10px",
        })
      ),
      transition("open => closed", [animate("1s")]),
      transition("closed => open", [animate("1s")]),
    ]),
  ],
})
export class ChatbotComponent implements OnInit {
  public showChatBox: boolean;
  public showChatIcon: boolean;
  public message: string;
  public msgCount: number = 0;
  public botResponse: any;
  public initialMsgShown: boolean = false;
  public showTyping: boolean = false;
  isOpen = true;
  public modalRef: BsModalRef;
  public interval: any;
  public navigateToPage: Boolean = false;
  @ViewChild("displayMsg") div: ElementRef;
  @ViewChild("inputMsg") input: ElementRef;
  @ViewChild("confirm") confirmMessage: ElementRef;

  constructor(
    private renderer: Renderer2,
    private msgService: MessageService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.showChatIcon = true;
    this.showChatBox = false;
  }

  ngOnInit() {
    this.startInterval();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  startInterval() {
    this.interval = setInterval(() => {
      this.toggle();
    }, 1000);
  }
  stopInterval() {
    clearInterval(this.interval);
    this.isOpen = true;
  }

  openConfirmDialog() {
    this.navigateToPage = !this.navigateToPage;
    this.modalRef = this.modalService.show(this.confirmMessage);
  }

  public onConfirm(): void {
    this.navigateToPage = true;
    this.modalRef.hide();
    this.router.navigate([]).then((result) => {
      window.open(this.botResponse["url"], "_blank");
    });
  }

  public onCancel(): void {
    this.navigateToPage = false;
    this.modalRef.hide();
  }

  ngAfterViewChecked() {
    if (this.showChatBox && !this.initialMsgShown) {
      this.initialMsgShown = true;
      const message =
        "Hiiii.. I am your Roo's Bot and here to help you..Common get started";
      this.displayMessage(message, "self");
    }
  }

  scrollToBottom(): void {
    try {
      this.div.nativeElement.scrollTop = this.div.nativeElement.scrollHeight;
    } catch (err) {}
  }

  toggleChatBox() {
    this.showChatBox = !this.showChatBox;
    this.showChatIcon = !this.showChatIcon;
    this.initialMsgShown = this.showChatBox ? false : true;
  }

  sendMessage(message: string) {
    console.log(message);
    if (message.trim() !== "") {
      this.displayMessage(message, "user");
    }
    this.showTyping = true;
    setTimeout(() => {
      this.getBotResponse(message);
    }, 2000);
  }

  speak() {
    const messages = document.getElementsByClassName("cm-msg-text");
    console.log(this.botResponse);
    const lastMessage = this.botResponse["text"];
    let msg = new SpeechSynthesisUtterance(lastMessage);
    window.speechSynthesis.speak(msg);
  }

  displayMessage(message: string, type: string) {
    this.msgCount++;
    var str = ` <span class="msg-avatar">
                  <img src="assets/images/${type}-icon.png">
                </span>
                <div class="cm-msg-text">
                  ${message}
                </div>
              </div>`;

    const p: HTMLDivElement = this.renderer.createElement("div");
    p.innerHTML = str;
    p.className = "chat-msg " + type;
    p.id = "cm-msg-" + this.msgCount;
    this.renderer.appendChild(this.div.nativeElement, p);
    // this.renderer.setStyle(p, 'style', this.style);
    if (type === "user") {
      this.input.nativeElement.value = "";
    }
    this.scrollToBottom();
  }

  getBotResponse(message) {
    this.msgService.getBotResponse().subscribe((result) => {
      this.botResponse = result.find((e) => e.user === message).bot;
      const answer = this.botResponse
        ? this.botResponse["text"]
        : "No messgage";
      this.displayMessage(answer, "self");
      this.showTyping = false;
      if (this.botResponse["url"]) {
        const link = this.botResponse["url"];
        console.log("1111", link);
        this.msgService.setItem("url", this.botResponse["url"]);
        this.displayMessage(this.botResponse["url"], "self");
        // this.router.navigate(["about"]);
        this.openConfirmDialog();
        if (this.navigateToPage) {
        }
      }
      if (this.botResponse["directions"]) {
        this.msgService.setItem("maps", JSON.stringify(this.botResponse));
        this.router.navigate(["maps"]);
      }
    });
  }
}
