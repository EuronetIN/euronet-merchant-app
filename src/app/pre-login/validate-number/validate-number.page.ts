import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { chevronBackOutline } from 'ionicons/icons';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-validate-number',
  templateUrl: './validate-number.page.html',
  styleUrls: ['./validate-number.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ValidateNumberPage implements OnInit {
  account: any;
  numberForm!: FormGroup;
  constructor(public formBuilder: FormBuilder) {
    addIcons({
      chevronBackOutline,
    });

    this.numberForm = this.formBuilder.group({
      number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  ngOnInit() {}

  onBack() {}

  validateNumber() {}
}
