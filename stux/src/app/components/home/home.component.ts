import { Component, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Interactions } from 'aws-amplify';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface buttons {
  text: string;
  value: string;
}

export interface responseCard {
  message: string;
  imageURL: string;
  buttons: any[];
}

export interface messages {
  flag: string;
  message: responseCard[]
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('chat')
  chat: ElementRef;

  @ViewChild('list')
  myScrollContainer: ElementRef;

  showChatWindow: boolean;
  showChatButton: boolean;
  canShowChatButton: boolean;
  isloading: boolean;
  loading: string;
  inputText: string;

  chatForm: FormGroup;

  messages: messages[];

  constructor(private renderer: Renderer2) {
    this.showChatWindow = false;
    this.showChatButton = true;
    this.canShowChatButton = true;
    this.isloading = false;
    this.loading = 'sent';
    // this.test();
    this.messages = [];

    this.chatForm = new FormGroup({
      inputText: new FormControl('', [Validators.required]),
    }, {});
    this.scrollToBottom();
  }

  async test() {
    const response = await Interactions.send("callcenter", 'hi');

    // Log chatbot response
    console.log(response);
  }

  scrollToBottom(): void {
    try {
      // console.log(this.myScrollContainer.nativeElement.scrollHeight);
      this.renderer.setProperty(this.myScrollContainer.nativeElement, 'scrollTop', this.myScrollContainer.nativeElement.offsetHeight - this.myScrollContainer.nativeElement.scrollTop);
      // console.log(this.myScrollContainer.nativeElement.scrollTop);
    } catch (err) {}
  }


  async sendMessageButton(event) {
    this.inputText = event.target.innerText;
    // console.log('text: ' + this.inputText);
    const messageSent = {
      flag: 'sent',
      message: [{
        message: this.inputText,
        imageURL: null,
        buttons: []
      }]
    }
    this.messages.push(messageSent);
    this.scrollToBottom();
    //Init loader
    const response = await Interactions.send("callcenter", this.inputText);
    //Stop loader
    // Build response
    const messageReceived = {
      flag: 'received',
      message: [{
        message: response['message'],
        imageURL: response['responseCard'] ? response['responseCard']['genericAttachments'][0]['imageUrl'] : null,
        buttons: response['responseCard'] ? (response['responseCard']['genericAttachments'][0]['buttons'] && response['responseCard']['genericAttachments'][0]['buttons'].length ? response['responseCard']['genericAttachments'][0]['buttons'] : []) : []
      }]
    };
    this.messages.push(messageReceived);
    this.scrollToBottom();
  }

  async sendMessage() {
    console.log('button');
    this.inputText = this.chatForm.get('inputText').value;
    this.chatForm.reset();
    // console.log('text: ' + this.inputText);
    const messageSent = {
      flag: 'sent',
      message: [{
        message: this.inputText,
        imageURL: null,
        buttons: []
      }]
    }
    this.messages.push(messageSent);
    this.scrollToBottom();
    //Init loader
    const response = await Interactions.send("callcenter", this.inputText);
    console.log(response);
    //Stop loader
    // Build response
    const messageReceived = {
      flag: 'received',
      message: [{
        message: response['message'],
        imageURL: response['responseCard'] ? response['responseCard']['genericAttachments'][0]['imageUrl'] : null,
        buttons: response['responseCard'] ? (response['responseCard']['genericAttachments'][0]['buttons'] && response['responseCard']['genericAttachments'][0]['buttons'].length ? response['responseCard']['genericAttachments'][0]['buttons'] : []) : []
      }]
    };
    this.messages.push(messageReceived);
    // console.log(this.messages);
    this.scrollToBottom();
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

  async init() {
    const response = await Interactions.send("callcenter", 'hi');
    //Stop loader
    // Build response

    const messageReceived = {
      flag: 'received',
      message: [{
        message: response['message'],
        imageURL: response['responseCard'] ? response['responseCard']['genericAttachments'][0]['attachmentLinkUrl'] : null,
        buttons: response['responseCard'] ? (response['responseCard']['genericAttachments'][0]['buttons'] && response['responseCard']['genericAttachments'][0]['buttons'].length ? response['responseCard']['genericAttachments'][0]['buttons'] : []) : []
      }]
    };
    this.messages.push(messageReceived);
  }


  ngOnInit() {
    this.init();
  }

}
