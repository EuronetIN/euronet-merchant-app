import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DatePickerComponent implements OnInit {
  @Input()
  selectedDate!: string;
  @Input() minDate!: string;
  @Input() maxDate!: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

  confirmDate() {
    this.modalController.dismiss(this.selectedDate);
  }
}
