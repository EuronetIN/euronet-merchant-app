import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { IonicModule, AlertController } from '@ionic/angular';
import { VirtualNumericKeyboardPage } from 'src/app/shared/virtual-numeric-keyboard/virtual-numeric-keyboard.page';
import { CommanUtils } from 'src/app/Utils/comman-utils';
import { GlobalService } from 'src/app/services/global.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, VirtualNumericKeyboardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SigninPage implements OnInit {
  otpDigits: string[] = ['', '', '', '', '', ''];
  viewPasswordLogin: boolean = false;
  @Input() isModal: boolean = false;
  selectedIndex: number = 0;

  dummyData: any = {
    header: {
      BankCode:
        'Tv2MMUOL4J1pBugUYzIEN3Yd+tohEUrKjMrccWS/er9sjrTaJ9uTLudIL7ez1B6hfM78uPJd6FHh\noHHgOhsY7W5KTSxLfpS+iGHCAG21BhiLRMIPfhXt3qSHi9vJhitTVEmEZrJDDe67i5A9f9WXK8r/\nIlJQKbf3JDB1niDxu1g=\n',
      Channel:
        'GozvA0cKwVcnt3W3zGDGl+cge6FGnWs7LgegaL/MQfBf8NoiujLVam7sFPW3SNxIWrEfeQld+1/Q\nBfTYM+gi+NUQk7637PXB6bzY4pHbv8orUIPT0CQVyCVrQGKhROaL1vyGaE3k2V1xCwSaZ799zzql\nBh2K92dCoB63kj/hoYc=\n',
      customerInfo: {
        customerId:
          'vddRBMkCGzp6F3mayHlUhqyplO3UqALjVNiVcEBPaTN0qaY4DQ71hw+QoG+ZqIkBTamoFEW0CsUv\ngioEHESQQcVloY50q5PDS9SM0R65Lq27S8PxTAfd5zEQBPEMSketHaA6/upAlRsUh5A4UIbYI3Qk\nEFZTwEZ4L6KUUDhJwCo=\n',
        mobileNo:
          'eWDmBfchOOmUO1xHtYVJOWcoC9J3winGAgWShWM2MsFsIK+Iy+fCNcHP/2MJt10evLI80Rsg3fsZ\nYC3Mp/aGgOTn6GEHpvIFIGsbUW3LUw9VZ3Tw9f/yZiCGFUWGt2DlmXNFkOwze5tHN865mPvPeSEK\nb4KLglRQmBCg9K8eXj4=\n',
        upitoken:
          'kKwc6l9TJM6xnJ+LIT1XpUHDaZgVpAREKLECFUdVuzCIcSemi5i9lpBoc4KRkWeXO49HR9osLXET\nIoONmc/oEb5fjjcc0f3oFljOU2rtoFmVQCsLLDOu5jZZf86/HRnSi/6q4UF8p6Z0jh/3DjnL3YkA\nFA0237P97dWGvo9Lbd8=\n',
        sessionId:
          'X/Hl1rFCKfmOvCQAbRcDbtSs+Jv3ZyR/4WoPNnMsLuwy/+BYXV9zAQRKiCUDtP7WpwJnhBNh+yy4\n/gjc96hNfpiJ6G8zAWeRPzJe/ramHZcWmLgoLBUiSbt2v+wPcbBlnunvlugxe5atHLrluixMwCN4\nu73f7tvcOyq6tMOZU3U=\n',
        profileId:
          'eyxzAbyY7K0Kke8aDKar3fVFJXWjxDMB1aMFx7NHN+c1Xx4RHxuNLYJwDZSYmdYUwhBSwO83IxEg\nVrKvfh6vUSIpVN9qlTo+Cpb/IyXuHyG3Lr3tP3sx0wDoBJh64ENz+CJX7zMxgEsuUlai7dcqEqMh\nWsjqpiik+SDz6W8lFec=\n',
        token: '',
      },
      deviceInfo: {
        geocode:
          'g8OBYBCFWxxrrG7TptEUmfALSEcjcBr7H7CnCM15wzXNlctJazix06blw7TsCr+WXhplppLZEiEO\nWgKOEYVo/XKDjdM73F0w+8UH0X5IGfd03yaRWmtXi24+ol0Wmf3+Sl0jFmrvI4GwG2oh2OQTyQ0F\nqjiLlJkV53NDXHQJhQE=\n',
        location:
          'Sgh75Ia4dE2LReGoyLFAMzQ+egnptogU66NKW5nWAnP/ABK6OzcWbzkk782V9r3i3Mzex4DUonfW\nwhp76mE/lnaDYBUjxmztqJ9X5C3o5E+OnvCLY9qKU7IsGmuoulzE9q4VSDvY6oe74Ky3EAnAu5GU\nhIKrFDtBZZ+IXUk7p0g=\n',
        ip: 'BdH8mcw+QxmOFc56EPT6H9dE6M0vy29ogHN8NzKancEH3Bxc4G73fvuMxb2Zxwi0DDR1u4Pe/URI\n4WOn48yfWBFdeSrlTpADToxEv0CPut1evzCYkzrbyQ3aAvggxohD4THpnra6CEsYx3nC3rBtl9yE\n2pPMJg0y2q8EN3kuKIc=\n',
        type: 'FXWzFY/1LsFd9nokVr3ZNfwJsDNOlEtDxMawkhJj0uKUjY6llRzEz2idP7s0xOq807gpCJ3H63w2\nCbLZwvKgaii+mhreraob+ILvffIZyu/w+6Jv1/naQGPuI3j27REU1DCQxCGIwtwTZFcNiWaOZnqa\n4azc+u11kjlJLLri2e0=\n',
        id: 'Khz04aXP3IeUQCOdOh2qGsBllIgOQzBx6GQd/+3sDUyn3jAeSSlui3zUNxYn5KHH51DXfVP/+AdS\ndRLt2RzuHEUr04EaDVg/o9oMM8b09av594HAwsjhQQ3caugMjo7A9GSfVbyp0SMufbBKuhxT2pP5\nvkfv5ox6NiWfvs89hb0=\n',
        os: 'tPeEMFYysx1Nkhu3kne5WtP/MGrOmzrwt5tRL/C+lsmDE6ckQ4B6yYaxa5bLasHFY116sw5DmMN8\nOQFKzdMH3/lfCGfw325MGLjcmzXoEP22Stbm+cAa1B6D8Etg/m92DJk5cD6NzN2+pwoq55jMW9aF\nXLRxzO9FTPu7ysZ9Q34=\n',
        app: 'pv8Oyu6mn+0wc97dC8ZP2MOQEtxWxRGd5ZYra+pxq2C4rGeSlPnZqnB0FIiay3frcM1B8h+JDUb7\nyC84fFnWa5IxEhvcOiwk88HX8yE5pOyulvTEZA6Rtlpd1VHFRiEYpxgyo8NmWUjAb4W3CEJZ/JjQ\niqaE//wIeKrKnxvqHI8=\n',
        capability:
          'XMvX24JYNOEPKTyqz5Ra4YQGpEDHK3tgDecT6aiOtXR8QDpsjmrKgks0g6n8lTYqEQ7bGyf0//Rz\nvFuQL7eztDI54waB11WhDHjEFdSoti0JyIuTYBJKGkHDabw4bss2+tw0L21e6AQucOymt7KNEHHO\nVqgaiwCbmdLYj1ONLNs=\n',
        telecom:
          'FdvQ6w2g53HCn2YPOSnf40MyV8vT/9+7Bw1W9z1BHdPH48LBvyg2Fot2qc8wTslKuricpNBVNhFa\nE8CIkDXbmAZY1BuOVKU++P92we6n7kQ9OCSjte4Rw5oJ9nK70rQb4XnNr2vfa3L8fQfy9Ipr8I+p\neMK7DSJtFRToFxeQqUE=\n',
      },
    },
    transactionInfo: {
      transactionid: 'IOB20241113B8JKC9A657O9PYWG2TEIP8SL',
      transactiondatetime: '2024-11-13 17:10:39',
      attributes: {
        fcmtoken:
          'eDiS-LOZRvuKpTubN03wri:APA91bFqePhOopkVL_Gb4hkcQvcOB4ceVWc5RtvWqlJ1F5wvZTnyCOkhVDwKjZ6jheaYYLF-yVpzHeHLA553ZBj4tFIsCK9W15x6DkfDXzxinbL7naowDv8',
        apin: '131995',
        issubmerchant: '0',
        subMerchantMobno: '9405518281',
      },
    },
    ChkValue: 'p2F7pN1QnsjAj13woQbTa+eiHjx+D/2aM+SqdkfKYEo=',
  };
  constructor(
    private alertCtrl: AlertController,
    private cmnUtils: CommanUtils,
    private global: GlobalService,
    private api: ApiService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.logIn();
    // console.log('checking dummydata : '+ JSON.stringify(this.dummyData));
  }

  changeTypeLogin() {
    console.log('clicked changeTypeLogin');
  }
  onForgot() {
    console.log('forgotPinClicked');
  }

  onGetStarted() {
    console.log('Login btn pressed');
    this.navCtrl.navigateForward(['/validate-number']);
  }

  handleKeyPress(key: any) {
    if (key === 'Del') {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
        this.otpDigits[this.selectedIndex] = '';
      }
    } else if (key === 'Confirm') {
      this.confirmOtp();
    } else {
      if (this.selectedIndex < this.otpDigits.length) {
        this.otpDigits[this.selectedIndex] = key;
        this.selectedIndex++;

        if (
          this.selectedIndex === this.otpDigits.length &&
          !this.otpDigits.includes('')
        ) {
          this.confirmOtp();
        }
      }
    }
  }

  async confirmOtp() {
    const otp = this.otpDigits.join('');
    if (otp.length < 4 || this.otpDigits.includes('')) {
      const alert = await this.alertCtrl.create({
        header: 'Incomplete OTP',
        message: 'Please enter all 4 digits.',
        buttons: ['OK'],
      });
      await alert.present();
    }
    // this.onHome(otp);
  }

  async logIn() {
    console.log('Login Clicked');
    // this.cmnUtils.showLoading();
    const dmyData = this.dummyData;

    this.api
      .sendPostRequest('appmerchantcredentialsvalidate', dmyData)
      .then((res: any) => {
        console.log('Checking RespData :' + JSON.stringify(res));
        const decrypted = this.global.decryptAesEcbNoPadding(
          res,
          'e4c7303fb47959a71177bb31ce403451'
        );
        console.log('Decrypted:', decrypted);
      });
    // console.log('Attributes : ' + JSON.stringify(attributes));
    // this.global.getApiResponse("appmerchantcredentialsvalidate", dmyData, undefined, (res: any) => {
    //   this.cmnUtils.hideLoding()
    //   console.log('Checking RespData :' + JSON.stringify(res));
    // });
  }
}
