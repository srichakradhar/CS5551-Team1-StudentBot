import { MessageService } from './../services/message.service';
import { Component, OnInit, ElementRef, ViewChild, Renderer2, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations : [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        bottom: '60px',
        right: '40px'
      })),
      state('closed', style({
        opacity: 1,
        bottom: '10px',
        right:'10px'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),
  ]
})
export class ChatbotComponent implements OnInit {
  public showChatBox: boolean;
  public showChatIcon: boolean;
  public message: string;
  public msgCount: number = 0;
  public initialMsgShown: boolean = false;
  public showTyping: boolean = false;
  isOpen = true;
  public interval: any;
  @ViewChild('displayMsg') div: ElementRef;
  @ViewChild('inputMsg') input: ElementRef;

  constructor(private renderer: Renderer2,
              private msgService: MessageService) { 
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
    }, 1000)
  }
  stopInterval() {
    clearInterval(this.interval);
    this.isOpen = true;
  }

  ngAfterViewChecked() {
    if (this.showChatBox && !this.initialMsgShown) {
      this.initialMsgShown = true;
      const message = "Hiiii.. I am your Roo's Bot and here to help you..Common get started";
      this.displayMessage(message, 'self');
    }
  }

  scrollToBottom(): void {
    try {
        this.div.nativeElement.scrollTop = this.div.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  toggleChatBox() {
    this.showChatBox = !this.showChatBox;
    this.showChatIcon = !this.showChatIcon;
    this.initialMsgShown = this.showChatBox ? false : true;
  }

  sendMessage(message: string) {
    console.log(message)
    if (message.trim() !== '') {
      this.displayMessage(message, 'user');
    }
    this.showTyping = true;
    setTimeout(() => {
      this.displayMessage(message, 'self');
      this.showTyping = false;
    }, 2000);
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
   
    const p: HTMLDivElement = this.renderer.createElement('div');
    p.innerHTML = str;
    p.className = 'chat-msg '+ type;
    p.id = 'cm-msg-'+this.msgCount; 
    this.renderer.appendChild(this.div.nativeElement, p);
    // this.renderer.setStyle(p, 'style', this.style);
    if (type === 'user') {
      this.input.nativeElement.value = '';
    }
    this.scrollToBottom();
    this.msgService.sendMessageToBot(message).
      subscribe(data => {
        console.log("Posted the data");
      }, (err) => {
        console.log("Error in posting data");
      })
  }
  
}
