import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  aboutForm: FormGroup;
  editNotice: FormGroup;
  addNotice: FormGroup;

  public notices: Observable < any[] > ;
  public about: Observable < any[] > ;
  noticeItems: any[];
  aboutItems: any[];
  editIndex: any;
  editText: any;

  showEdit: boolean;
  showAdd: boolean;

  constructor(private db: AngularFirestore, private authService: AuthService, private router: Router) {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['admin']);
    }
    this.showEdit = false;
    this.showAdd = false;
    this.editText = '';
    this.aboutForm = new FormGroup({
      about: new FormControl('', [Validators.required])
    }, {});
    this.editNotice = new FormGroup({
      message: new FormControl('', [Validators.required])
    }, {});
    this.addNotice = new FormGroup({
      message: new FormControl('', [Validators.required])
    }, {});
    this.noticeItems = [];
    this.aboutItems = [];
    this.about = db.collection('/about').valueChanges();
    this.notices = db.collection('/notices').valueChanges();
    this.about.subscribe(
      res => {
        this.aboutItems = res;
        console.log(res);
        this.aboutForm.get('about').setValue(this.aboutItems[0].text);
      },
      err => {

      });
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
  }

  ngOnInit() {}


  initEdit(i, text) {
    this.editIndex = i;
    this.showEdit = true;
    this.editText = text;
  }

  closeEdit() {
    this.showEdit = false;
  }

  closeAdd() {
    this.showAdd = false;
  }

  addNotices(value) {
    this.db
      .collection("/notices")
      .doc(String(this.noticeItems.length))
      .set({ message: value.message, date: moment().format('DD/MM/YYYY') });
    this.showAdd = false;
  }

  updateAbout(value) {
    this.db
      .collection("/about")
      .doc('0')
      .set({ text: value.about }, { merge: true });
  }


  deleteNotice(i) {
    this.db
      .collection("/notices")
      .doc(String(i))
      .delete();
  }

  updateNotice(value) {
    this.db
      .collection("/notices")
      .doc(String(this.editIndex))
      .set({ message: value.message }, { merge: true });
    this.showEdit = false;
  }

  showAddWindow() {
    this.showAdd = true;
  }
}
