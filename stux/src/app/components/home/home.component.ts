import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('chat')
  chat: ElementRef;
  showChatWindow: boolean;
  showChatButton: boolean;
  canShowChatButton: boolean;

  constructor() {
    this.showChatWindow = false;
    this.showChatButton = true;
    this.canShowChatButton = true;
  }


  openChat(event) {
    this.canShowChatButton = false;
    this.showChatButton = false;
    this.showChatWindow = true;
    event.stopPropagation();
  }


  closeChat(event) {
    this.canShowChatButton = true;
    this.showChatWindow = false;
    this.showChatButton = true;
    event.stopPropagation();
  }

  ngOnInit() {}

}
