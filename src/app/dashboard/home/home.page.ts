import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonicSlides,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonicModule,
  ],
})
export class HomePage implements OnInit {
  // accountsListData: UserAccount[] = [];
  // source: QRModalResult['source'] = 'scan';
  bharatQRString: string = '';
  isBeneficiaryListEmpty: boolean = false;
  // beneficiaryResponse: BeneficiaryListResponse = {
  //   beneficiary: [],
  // };
  beneficiaryResponseMessage: string = '';

  //Personal Details Started
  _name: string = '';
  _mobileNo: string = '';
  _accountNo: string = '';
  _upiId: string = '';
  //Personal Details End
  _alertMessage: string = '';
  _alertTitle: string = '';
  _buttonText: string = '';
  public _bankAccountLinked: boolean = false;
  public _primaryAccountData: any = {};
  public _qrData: string = '';

  swiperModules = [IonicSlides];

  PaymentFeatures = [
    {
      title: 'Pay <br> UPI ID',
      image: 'assets/images/pay-upi-id.svg',
      path: '/send-via-upi',
    },
    {
      title: 'Self  <br> Transfer',
      image: 'assets/images/self-transfer.svg',
    },
    {
      title: 'Bank <br> Transfer',
      image: 'assets/images/bank-transfer.svg',
      path: '/send-via-bank',
    },
    {
      title: 'Request <br> Money',
      image: 'assets/images/request-money.svg',
      path: '/request-money-number',
    },

    {
      title: 'Pay <br> UPI ID',
      image: 'assets/images/pay-upi-id.svg',
      path: '/send-via-upi',
    },
    {
      title: 'Self <br> Transfer',
      image: 'assets/images/self-transfer.svg',
    },
    {
      title: 'Bank <br> Transfer',
      image: 'assets/images/bank-transfer.svg',
      path: '/send-via-bank',
    },
    {
      title: 'Request <br> Money',
      image: 'assets/images/request-money.svg',
      path: '/request-money-number',
    },
  ];

  pendingRequest = [
    {
      name: 'Roza Shaikh',
      upiid: 'tausifshaikh&#64;upi',
      image: '../../../assets/images/Pending image.svg',
      amount: 'Rs.1900',
      date: '6 June 2024',
    },
    {
      name: 'Roza Shaikh',
      upiid: 'tausifshaikh&#64;upi',
      image: '../../../assets/images/Pending image.svg',
      amount: 'Rs.1900',
      date: '6 June 2024',
    },
    {
      name: 'Roza Shaikh',
      upiid: 'tausifshaikh&#64;upi',
      image: '../../../assets/images/Pending image.svg',
      amount: 'Rs.1900',
      date: '6 June 2024',
    },
  ];

  groupedItems: any[][] = [];

  private destroy$ = new Subject<void>();
  upiId?: string;
  accountNo?: string;
  qrData?: string;
  accountName?: string;
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.groupedItems = this.groupArray(this.PaymentFeatures, 4);
  }
  

  onItemClick(path: string) {
    this.navCtrl.navigateForward(path);
  }

  groupArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}
