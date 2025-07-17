import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonicSlides,
  IonTab,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { addIcons } from 'ionicons';
import { home, qrCode, bag, swapHorizontal } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class DashboardPage implements OnInit {
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

  transactionInfo: any = [
    {
      transactionid: '1315b2926458',
      transactiondatetime: '2024-11-13 17:16:59',
      result: {
        message: 'SUCCESS',
        code: '00',
        isactive: true,
        codedescription: null,
      },
      attributes: {
        transactions: [
          {
            TxnId: 'IOB6E9755E9D8954CFBBD9D3826E01857E2',
            PayerVPA: '7028881531@iob',
            PayerName: 'K RAJASANKAR',
            PayerAccount: '208501000011999',
            PayerIFSC: 'IOBA0002085',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '100.00',
            Date: 'Nov 13 2024 11:46AM',
            custrefnumber: '431811719234',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'UPI Lite Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBD4AE7829132F403FB1F7CBB7B5203A60',
            PayerVPA: '7028881531@iob',
            PayerName: 'K RAJASANKAR',
            PayerAccount: '208501000011999',
            PayerIFSC: 'IOBA0002085',
            PayeeName: 'Merchant ujjwal',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '2.00',
            Date: 'Nov 12 2024 11:19AM',
            custrefnumber: '431711910055',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'UPI Lite Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBE6B5C3E81B604EF693CF83EC8670182E',
            PayerVPA: '7028881531@iob',
            PayerName: 'K RAJASANKAR',
            PayerAccount: '208501000011999',
            PayerIFSC: 'IOBA0002085',
            PayeeName: 'Merchant rahul',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '32.00',
            Date: 'Nov 12 2024 11:04AM',
            custrefnumber: '431711458271',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'UPI Lite Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB103D445A8B364B0F9BF2A911A50E3DED',
            PayerVPA: '7987112820@iob',
            PayerName: 'DEBRAJ SAHA',
            PayerAccount: '058501000012347',
            PayerIFSC: 'IOBA0000585',
            PayeeName: 'Merchant viraj',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '5.00',
            Date: 'Nov 12 2024  7:28AM',
            custrefnumber: '431707396715',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'UPI Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBD23CCE57694C4B019E577382DF1139D4',
            PayerVPA: '7987112820@iob',
            PayerName: 'DEBRAJ ankit',
            PayerAccount: '058501000012347',
            PayerIFSC: 'IOBA0000585',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '3.00',
            Date: 'Nov 12 2024  7:25AM',
            custrefnumber: '431707398577',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'UPI Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBDC5966149D25491BA9A91AF8287ED9E7',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '55.00',
            Date: 'Nov  7 2024 12:24PM',
            custrefnumber: '431212246680',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBF9BF1F58C44D49B8AE48D8DD3CD20E1B',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '5.00',
            Date: 'Nov  7 2024 12:21PM',
            custrefnumber: '431212408102',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB4F8331CE0994442C9BF29143B3B6C510',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '199.00',
            Date: 'Nov  6 2024  4:38PM',
            custrefnumber: '431116419554',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB2493DD3F89F34390857C4D985D10A770',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '8.00',
            Date: 'Nov  6 2024  4:36PM',
            custrefnumber: '431116144589',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB6C8E1DA82A19431194CFE54DD9839EB3',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '39.00',
            Date: 'Nov  6 2024  4:33PM',
            custrefnumber: '431116570726',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB6D36DEF122FA493BBC96BA9D47CFE941',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '33.00',
            Date: 'Nov  6 2024  4:32PM',
            custrefnumber: '431116555055',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBFF92E72FD8584A05A48F2F471C8C3804',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '36.00',
            Date: 'Nov  6 2024  4:31PM',
            custrefnumber: '431116126159',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBE008CF31B9D1476F8C82A22D2F1BE135',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '55.00',
            Date: 'Nov  6 2024  4:30PM',
            custrefnumber: '431116655105',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBCF7166ECA20A457DA732132105282011',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '3.00',
            Date: 'Nov  6 2024  3:49PM',
            custrefnumber: '431115116123',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB4103F99B57144161A9CE9F60860ED15B',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '85.00',
            Date: 'Nov  6 2024  3:46PM',
            custrefnumber: '431115187313',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB224F4E99E0E9438A8D06FCACA1B550C8',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '2.00',
            Date: 'Nov  6 2024  3:42PM',
            custrefnumber: '431115903640',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOBA122A0BA22FE4356800F4F5457CEA8C0',
            PayerVPA: 'Radhesham2024@iob',
            PayerName: 'MAUSAM KUNAL',
            PayerAccount: '113301133011330',
            PayerIFSC: 'IOBA0001133',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '9.00',
            Date: 'Nov  6 2024  3:38PM',
            custrefnumber: '431115727560',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB4FAB1ECB7BE4405CA1218DCB49413181',
            PayerVPA: '7028881531@iob',
            PayerName: 'K RAJASANKAR',
            PayerAccount: '208501000011999',
            PayerIFSC: 'IOBA0002085',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '14.00',
            Date: 'Oct 24 2024 12:47PM',
            custrefnumber: '429812349305',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'UPI Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB66C67ABCD36B4B40A6388E347507BA62',
            PayerVPA: '7028881531@iob',
            PayerName: 'K RAJASANKAR',
            PayerAccount: '208501000011999',
            PayerIFSC: 'IOBA0002085',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '11.00',
            Date: 'Oct 24 2024 12:25PM',
            custrefnumber: '429812690530',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'UPI Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
          {
            TxnId: 'IOB4BD7FB87751949C5861682F3478BFB31',
            PayerVPA: '7028881531@iob',
            PayerName: 'K RAJASANKAR',
            PayerAccount: '208501000011999',
            PayerIFSC: 'IOBA0002085',
            PayeeName: 'Merchant prachi',
            PayeeVPA: 'prachitestdemo@iob',
            PayeeAccount: '010901000063811',
            PayeeIFSC: 'IOBA0000298',
            Amount: '45.00',
            Date: 'Oct 24 2024 11:43AM',
            custrefnumber: '429811100638',
            TxnStatus: 'SUCCESS',
            Status: 'PENDING',
            Note: 'UPI Fund Transfer',
            Direction: 'Inward',
            PayerMCCCode: '0000',
            PayeeMCCCode: '1711',
            ResponseCode: '',
          },
        ],
      },
    },
  ];

  groupedItems: any[][] = [];
  payeeNames: string[] = [];
  txnDate: any[] = [];
  txnNote: any[] = [];
  txnStatus: any[] = [];
  txnAmount: any[] = [];

  private destroy$ = new Subject<void>();
  upiId?: string;
  accountNo?: string;
  qrData?: string;
  accountName?: string;
  selectedTab: string = 'home';

  constructor(private navCtrl: NavController, private datePipe: DatePipe) {
    register();
    addIcons({ home, bag, qrCode, swapHorizontal });
  }

  ngOnInit() {
    this.groupedItems = this.groupArray(this.PaymentFeatures, 4);
    this.getPayeeName();
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

  setTab(tab: string) {
    this.selectedTab = tab;
  }

  getPayeeName() {
    // Clear arrays before pushing
    this.payeeNames = [];
    this.txnDate = [];
    this.txnNote = [];
    this.txnStatus = [];
    this.txnAmount = [];

    let count = 0;

    for (const item of this.transactionInfo) {
      if (
        item?.attributes?.transactions &&
        Array.isArray(item.attributes.transactions)
      ) {
        for (const txn of item.attributes.transactions) {
          if (txn.PayeeName) {
            this.payeeNames.push(txn.PayeeName);
            // this.txnDate.push(txn.Date);
            this.txnNote.push(txn.Note);
            this.txnStatus.push(txn.TxnStatus);
            this.txnAmount.push(txn.Amount);

            console.log(
              `PayeeName: ${txn.PayeeName}, Date: ${txn.Date}, Note: ${txn.Note}, Status: ${txn.TxnStatus}`
            );
            this.formateDate(txn.Date);
            count++;
            if (count === 3) return; // Stop after 3 entries
          }
        }
      }
    }
  }

  ////Foramte Date according to the user visibility
  formateDate(rawDate: string): string {
    const correctedDateStr = rawDate.replace(
      /(\d{4}) (\d{1,2}:\d{2})(AM|PM)/,
      '$1 $2 $3'
    );

    const date = new Date(correctedDateStr);
    if (isNaN(date.getTime())) {
      console.warn('Invalid date:', rawDate);
      return rawDate; // Fallback to original
    }

    const formatted = this.datePipe.transform(date, 'hh:mma, dd MMM');
    console.log('Formatted date:', formatted || rawDate);
    this.txnDate.push(formatted || rawDate);
    return formatted || rawDate;
  }
}
