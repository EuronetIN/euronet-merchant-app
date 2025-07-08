import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-virtual-numeric-keyboard',
  templateUrl: './virtual-numeric-keyboard.page.html',
  styleUrls: ['./virtual-numeric-keyboard.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule]
})
export class VirtualNumericKeyboardPage implements OnInit {
  @Output() keyPress = new EventEmitter<string>();

  keys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Del', '0', 'Confirm'];
  onKeyClick(key: string) {
    this.keyPress.emit(key);
    console.log('Key pressed:', key);
  }
  ngOnInit() {
    console.log('VirtualNumericPageLoaded');
  }
}
