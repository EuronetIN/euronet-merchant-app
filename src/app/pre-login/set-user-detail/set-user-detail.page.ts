import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  Form,
  FormBuilder,
  FormControl,
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
import { IonicModule, ModalController } from '@ionic/angular';
import { first } from 'rxjs';
import { ToolbarComponent } from 'src/app/shared/toolbar/toolbar.component';
import { DatePickerComponent } from 'src/app/shared/date-picker/date-picker.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-set-user-detail',
  templateUrl: './set-user-detail.page.html',
  styleUrls: ['./set-user-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarComponent,
    // DatePickerComponent,
  ],
})
export class SetUserDetailPage implements OnInit {
  customActionSheetOptionsDistrict = {
    header: 'Select District',
  };
  customActionSheetOptionsState = {
    header: 'Select State',
  };
  customActionSheetOptionsMerchantService = {
    header: 'Select Merchant Service',
  };
  customActionSheetOptionsMerchantType = {
    header: 'Select Merchant Tpe',
  };

  districtList = [
    {
      state: 'Maharashtra',
      districts: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad'],
    },
    {
      state: 'Karnataka',
      districts: [
        'Bengaluru Urban',
        'Mysuru',
        'Mangaluru',
        'Hubballi',
        'Belagavi',
        'Ballari',
      ],
    },
    {
      state: 'Tamil Nadu',
      districts: [
        'Chennai',
        'Coimbatore',
        'Madurai',
        'Tiruchirappalli',
        'Salem',
        'Erode',
      ],
    },
    {
      state: 'Uttar Pradesh',
      districts: [
        'Lucknow',
        'Kanpur',
        'Varanasi',
        'Agra',
        'Prayagraj',
        'Meerut',
      ],
    },
    {
      state: 'West Bengal',
      districts: [
        'Kolkata',
        'Howrah',
        'Darjeeling',
        'Siliguri',
        'Asansol',
        'Durgapur',
      ],
    },
  ];

  states = this.districtList.map((item) => item.state);
  districts: string[] = [];
  detailForm: FormGroup;
  private isDatePickerOpening = false;
  selectedDate: string = '';
  private today = new Date();
  private minDate = new Date();
  private maxDate = new Date();
  public minDateISO!: string; // ISO format for the modal
  public maxDateISO!: string; // ISO format for the modal
  public selectedDateISO!: string; // ISO format

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private modalController: ModalController,
    private global: GlobalService
  ) {
    this.detailForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      merchantName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      emailId: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(50),
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      enterLatitude: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      enterLongitude: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      merchantAddress: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      postOfficeName: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50),
      ]),
      pinCode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      state: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      subDistrict: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      merchantService: new FormControl('', [Validators.required]),
      merchantType: new FormControl('', [Validators.required]),
      gstNumber: new FormControl('', [
        Validators.minLength(10),
        Validators.maxLength(100),
      ]),
      date: new FormControl('', [Validators.required]),
      //  merchantAddress: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(10),
      //   Validators.maxLength(100),
      // ]),
      //  merchantAddress: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(10),
      //   Validators.maxLength(100),
      // ]),
    });
  }

  ngOnInit() {
    const formattedDate = this.formatDate(new Date(this.selectedDateISO));
  }

  private formatDate(date: Date | string): string | null {
    const inputDate = date;

    if (inputDate && !isNaN(new Date(inputDate).getTime())) {
      const formatted = this.datePipe.transform(inputDate, 'yyyy-MM-dd');
      console.log('Formatted date:', formatted);
      return formatted;
    } else {
      console.warn('Invalid date:', inputDate);
      return null;
    }
  }

  goBack() {}

  onStateChange(selectedState: string) {
    const found = this.districtList.find(
      (item) => item.state === selectedState
    );
    this.districts = found ? found.districts : [];
    this.detailForm.get('district')?.reset();
  }

  async validateForm() {
    console.log('onSubmit Clicked ');
    this.global.setRoot('dashboard');
    if (this.detailForm.valid) {
      console.log('from if :', this.detailForm.value);
    } else {
      console.log('from else :', this.detailForm.value);
      this.detailForm.markAllAsTouched();
    }
  }

  async openDatePicker() {
    if (this.isDatePickerOpening) {
      return;
    }
    this.isDatePickerOpening = true;
    const modal = await this.modalController.create({
      component: DatePickerComponent,
      componentProps: {
        selectedDate: this.selectedDateISO,
        minDate: this.minDateISO,
        maxDate: this.maxDateISO,
      },
      breakpoints: [0, 1],
      initialBreakpoint: 0.5,
    });

    modal.onDidDismiss().then((data) => {
      this.isDatePickerOpening = false;

      if (data.data) {
        this.selectedDateISO = data.data;
        const formattedDate = this.formatDate(this.selectedDateISO);

        if (formattedDate) {
          this.detailForm.get('date')?.setValue(formattedDate);
          console.log('✅ Checking date:', formattedDate);
        } else {
          console.warn('Skipping due to invalid date');
        }
      }
    });

    return await modal.present();
  }
}
