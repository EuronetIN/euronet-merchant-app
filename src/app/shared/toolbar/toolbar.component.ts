import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ToolbarComponent implements OnInit {
  @Input() title?: string;
  @Input() routerLink?: string;
  constructor(private navController: NavController) {
    addIcons({ chevronBackOutline });
  }

  ngOnInit() {}
  goBack() {
    if (this.routerLink) {
      this.navController.navigateBack(this.routerLink);
    } else {
      this.navController.back();
    }
  }
}
