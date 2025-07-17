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
  NavController,
} from '@ionic/angular/standalone';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { VerifyOtpPage } from 'src/app/shared/verify-otp/verify-otp.page';

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
  otpForm!: FormGroup;
  otpNumber: any;
  otp: any;
  isOtpSend: boolean = false;
  constructor(
    public formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {
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

    this.otpForm = this.formBuilder.group({
      otpNumber: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
  }

  ngOnInit() {}

  onBack() {}

  async validateNumber() {
    this.isOtpSend = true;
    //   const modal = await this.modalCtrl.create({
    //     component: VerifyOtpPage,
    //     cssClass: 'centered-modal',
    //     backdropDismiss: false,
    //     backdropBreakpoint: 0.1,
    //     showBackdrop: true,
    //     breakpoints: [0.5],
    //     initialBreakpoint: 0.4,
    //     handle: false,
    //   });
    //   await modal.present();
    //   const { data } = await modal.onDidDismiss();
    //   if (data === true) {
    //     console.log('otpData :' + data);
    //   }
  }

  verifyOtp() {
    console.log('verify otp');
  }
  validateOtp() {
    // this.navCtrl.navigateForward(['/dashboard']);
    this.navCtrl.navigateForward(['/set-user-detail']);
  }
}
