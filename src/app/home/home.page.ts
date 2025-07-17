import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { IonicModule, NavController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage {
  constructor(private navCtrl: NavController, private global: GlobalService) {}

  onNext() {
    console.log('lets start');
    this.navCtrl.navigateForward(['/signin']);
    // this.global.setRoot('register');
  }
}
