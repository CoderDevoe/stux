import { Component, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Interactions } from 'aws-amplify';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { environment } from 'src/environments/environment';
import * as moment from 'moment';

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

  @ViewChild('captchaElem')
  captchaElem: ElementRef;

  showChatWindow: boolean;
  showChatButton: boolean;
  canShowChatButton: boolean;
  isloading: boolean;

  captchaVerified: boolean;
  captchaSiteKey: string;
  captchaSecretKey: string;
  captchaload: boolean;

  inputText: string;

  chatForm: FormGroup;
  captchaForm: FormGroup;
  messages: messages[];

  public notices: Observable < any[] > ;
  public about: Observable < any[] > ;
  noticeItems: any[];
  aboutItems: any[];

  constructor(private renderer: Renderer2, db: AngularFirestore) {
    this.showChatWindow = false;
    this.showChatButton = true;
    this.canShowChatButton = true;
    this.isloading = false;
    this.captchaVerified = false;
    this.captchaload = true;
    this.captchaSiteKey = environment.recaptcha_site_key;
    this.captchaSecretKey = environment.recaptcha_secret_key;
    // this.test();
    this.messages = [];
    this.noticeItems = [];
    this.aboutItems = [];
    this.chatForm = new FormGroup({
      inputText: new FormControl('', [Validators.required]),
    }, {});

    this.captchaForm = new FormGroup({
      recaptcha: new FormControl('', [Validators.required])
    }, {});

    this.notices = db.collection('/notices').valueChanges();
    this.about = db.collection('/about').valueChanges();
    this.notices.subscribe(
      res => {
        console.log(res);
        this.noticeItems = [];
        res.forEach(item => {
          this.noticeItems.push({
            'date': moment(item.date, 'DD/MM/YYYY').format('LL'),
            'message': item.message
          });
        });
        console.log(this.noticeItems);
      },
      err => {
        console.log(err);
      });
    this.about.subscribe(
      res => {
        console.log(res);
        this.aboutItems = res;
      },
      err => {

      });
    this.scrollToBottom();
  }


  handleReset(): void {
    this.captchaVerified = false;
  }

  handleExpire(): void {
    this.captchaVerified = false;
  }

  handleLoad(): void {
    this.captchaload = false;
  }

  handleSuccess(event): void {
    console.log('captcha success');
    this.captchaVerified = true;
    this.showChatWindow = true;
    // return new Promise((resolve) => {});
  }

  async test() {
    const response = await Interactions.send("callcenter", 'hi');

    // Log chatbot response
    console.log(response);
  }

  scrollToBottom(): void {
    try {
      // console.log(this.myScrollContainer.nativeElement.scrollHeight);
      this.renderer.setProperty(this.myScrollContainer.nativeElement, 'scrollTop', this.myScrollContainer.nativeElement.scrollHeight);
      // console.log(this.myScrollContainer.nativeElement.scrollTop);
      // this.myScrollContainer.nativeElement.querySelector("#end").scrollIntoView(false);
      // this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.querySelector("#end").getBoundingClientRect().top;
      // console.log(this.myScrollContainer.nativeElement.querySelector("#end").getBoundingClientRect().top);
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
    // this.scrollToBottom();
    //Init loader
    this.isloading = true;
    const response = await Interactions.send("callcenter", this.inputText);
    //Stop loader
    this.isloading = false;
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
    // this.scrollToBottom();
    //Init loader
    this.isloading = true;
    const response = await Interactions.send("callcenter", this.inputText);
    console.log(response);
    this.isloading = false;
    //Stop loader
    // Build response
    const messageReceived = {
      flag: 'received',
      message: [{
        message: response['message'],
        imageURL: response['responseCard'] ? response['responseCard']['genericAttachments'][0]['imageUrl'] : null,
        buttons: response['responseCard'] ? (response['responseCard']['genericAttachments'][0]['buttons'] &&
          response['responseCard']['genericAttachments'][0]['buttons'].length ? response['responseCard']['genericAttachments'][0]['buttons'] : []) : []
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
    this.isloading = true;
    const response = await Interactions.send("callcenter", 'hi');
    //Stop loader
    this.isloading = false;
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
