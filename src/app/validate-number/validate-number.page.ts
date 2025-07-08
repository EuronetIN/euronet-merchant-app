import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommanUtils } from '../Utils/comman-utils';

@Component({
  selector: 'app-validate-number',
  templateUrl: './validate-number.page.html',
  styleUrls: ['./validate-number.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ValidateNumberPage implements OnInit {
  requiredForm: FormGroup;
  mobile: string = "";
  otp: string = "";
  isOtpSend = false;
  isMobileValid = true;
  counter = 0;
  startTime: any;
  myNumber: string | undefined;
  modifiedValue: string | undefined;


  dummyResponse = {
    "userInfo": {
      "profileId": "A2vkIPkNOK3vC3ipvyA9h05Mn3HWJY0L5CWFtN4Uy5eeExjEUIv04insnsMRa7SnYcWialbkZbikSCy18LyuNZaggTIfJ/w22KdvXG5Oys/SAX83R3NTUEJMy9K0IWDawOxPaejPCfrx4skAzbb9Bp/Vj2V69UOk4flVZNpm+Sc=",
      "firstName": "AgTQunJVvlw3j/GeetmVzQPyiOSIkAKsDHN2S0pRFDkjMQl6a0q8Ajdq9poS1KftftWDLUGhknbp3hCHgyJ0MczrfggRorzC63wgbWPgL+5jDECWVYbAHGliTFBdra8o4O77g5Sc2zl/h2pCyI2l9lMQlsh4P/8g0dYQG9q8QXM=",
      "lastName": "HTcXnKrjI9cmwV2wioNPJevmhim1388TwGnW70+at406+f2GM8iwm3YFs0JgjX0zVu1KgC8IkqE4VSMlymKpbs7pV/WWxmedDRX1AeEMcGqPUaILl8v78rx76sudQWKlQnoJ4FhdPI5bpZoo63h43QB9FhctIyzfIBmNhwZtlMY=",
      "mobileNo": "aFaygVoZujowKZOPOpFIBMoyoEor8mURSjd5QqqbW4KIvAZqZBzdelJ9iEw1DqdtWOKVs+/kc54wGw7pyI0Rfc034kFLB9cZNsDKf1s8xVR488rmjAtYzNypUTK9mCNRNQlok517lIKE3VNuChrBjXYN2pq+IVuPClHeDJDslwQ=",
      "email": "NKufEHjYFWXuHXmDPQ2U2Ft0/nQ+J9/rPRyFnC4esTkRinhQdq+k4zqWJONH0XTrBTyd3vy7Yakdx7Waq7v7df1tvM4s+jfSvGP0LdO1lbwuxzPTzM7g6QAlWJrCEVK00FaJC+WO8B2R37r42Cswv96RVYKcxucdRUuRigtLG2c=",
      "dob": "W2CQrdnD9hHU2KiVYx6sO7CtaQ0sRb7wT8iOEMuOf/y+ZYCbcAEdj7j0lHFTiC827LFLu2huO1TWbMmxYt+evAkKcIfL3Np0kFgk6UF+xcI65fJymuKrMXFLhKaIDCFyiJXoK7DkjmQjSb4VCG0tt1EqFh14f3fYzuxAz8QSIOs=",
      "authToken": "YFWymijsMbxbD/5MDUrllnXPs1TAofBpPraZPp9KKvmiTecJqogGeevV2U1YnTzuvBZ2PsFWFsPbO44jBiBqjCbqKnR6lgyXJf3vq1cP48NJr+npByrTlbvXMB+7ttT4hljgIJ6LN9sNJZMZoyEioUoxQ4E79sjaAfvMk8Nolkw=",
      "authTokenExpiryTs": "Kf3WsahVGO+t9X6IXrh+4wKxhgW8LukxtLo0at42MY0fKfmAKqrPm3a3UsQ6PQCHrKbiWAGd5AI3cRd5//BzWTDGyQvrcTr8SzMmALXILmNoHNZ5lG1oxwPLFvnKTydifdTU/JwHIxSV4LQbx3z/4Bkdzc9BUn/vWRFMLfPeFyU=",
      "createDateTime": "DNU/9YdSeW4J+zRqQNp/qb2ZgLLB12kDZsqGnf0whmmB5gcLKdZ4hlCkMin3DCNTczixMBL/NiBNp4XfKudPKUtS37Vp0etpob+11Ja7XYjeEuZZ6HnxsN9tup4GYop5V9RXazrmmlkMxIQxmpGP4TqHMUfdKHh7Zk0pX/vUL0o=",
      "defaultLanguage": "wvteM/D1XZ6iCOU6hUHstuElwzeYyfjlhlzAyg4vx4DnPF1AGGoqIQaTRe4VreVjPeHVVD6b61l+Ua8Guqz8FuwjpSU8FANfrnkR5ksXFrqvKN00XmtTp6oETm6CeJlXQm9o1UWUh9PjI1r9OOL4j0iikIKsAVHLJxXcBOzkeMo=",
      "dashBoardLayoutStyle": "MaeiFWVGI12zf25ans38m+2JmE8UXqFSDkE310eEQVj94P69kg1K8bHMXOuuYbFRJfoljOOU3KM9NjbhHroSBxzi9kXmHYKHsPgSmiG3HOW4cWRBOkcPlrtW2gJg45CFD4TGZH5Mwxf3ploX55wPnHv9m1+Nri2gKhERqPuibTQ=",
      "isAlreadyRegisteredUser": "dHjbc4RW3L9MTPOgc1VQ1dwRZoyKCJGumCU+sklTvlDQ5jHH9LjJHmN84e4j8WDZcdLeXWi+/4tP3P580T7t6plJWOIYqlrPqZbEaHwxwE6hUnyvj95QI4czOWDVBH9gaA0cQ5LFKAOVR/CocDrb9PzElifBIXGytLsDBgkwevU=",
      "isVpaExists": "OUMpySRRBQysq3F1S+gF2cB9kMWyuMSp6b7SKLqG1IPnuB0rPEdv+iiueiMALAJfiXg+BrDhmMzaJIQzKzGohncEHLRvuwqlwpVOELTHvp17upccdI+7xAsNM7iN7mWWhUE5TpCpjTFNDOqDmwNY5GZOO4kgl3LFt5IHRSpGYng=",
      "isAccountLinked": "tdsqxU1syg6u3QyGnmO6mBjONynrwhpIzsMbPPkGgjLBsSe78anFMFPtKcQa5O1j2xA+/ihIGduvl+FudzW7cLl8qBmboJihzk4S2pUN1zudPUzTu0fCcpvuev0xPJO2XXIISftnjfbepdgE7IAwe87gS1tMgky3d88MIaDKhU0=",
      "defaultAccountNumber": "YedZoLOL7S4nEAQyvCeQjs3yhlFGlMOlTVoOTKeATwEQl9SemI0yfeSQnVRo0IAR7G0vuoYe1fc4Dg9EuHecX7fh4WXVWT7VmWwBiGC0KXEInVXJ1P8QlWsf9uLi2QYVS0mf8nVqqrvENgRKD5Mftuw9mUqYjDVzfP/Z2j35tSc=",
      "IsPinSet": "0",
      "otp": "ikAvm3cUlHdJwRv/O9CF7+mXkTJLf+NhhiayLLbI9gNtWZtSgOgqPz0K/jZOcnuWgQkTBS/AEZaEFURt4pfQrgtyq6ujKR8P/4MAV5MXGeieGlETYJcobF2OXqXLiQjc2eyMa8hGpU/qKx7U8QCbqZ3xL7NAq1yuL+LfCyyYWvY=",
      "MyLanguage": "ZJKBipwzj6XIm7iQFRT+g/OzbqdmphF83pyBDoWPn0tzO75cuyVugHGN3+VFpjAuovus/PU7A+g7N+w0h7y6hTbEEZYqJGNquN3Dj0TFA7Tewmb7FK3GhMlEXZIz5yyoCQU92No2uixpsTZlW8uR/GcKXuMP+OtkAv9FpJPRLnA=",
      "senderId": "bPmQhK+7+aCL4EPvtf+yHv0zz7Oq5ez+ToEtWTJ8+QKQ0/YvJ6gZG3tUCnkx8qt9f3Mf421YOVdljujNSRJdOB5Ml256H2CVyjnGdvUigiZq/VZkQm3ob1mWf1lO+OAzVk2hbkXEJAl84dJJ6yBaMBmuJyunnl9e6gSgWJJ+C3Y=",
      "AlternateEmail": "T75yAa7zpw2PuerSnVIohP+hRzqg/aVb68MID+7vAl0ldtHwdPNOePuTdEPxsakBL4coXbi/AFdd5TYap1vzRNVyPG9x5BMo/zpEO1HyFniCRNQ0Ws/JYtiBlHTH6ZkUjvmkiVOIXUyJ8rdg6REvqB/5U3Q4XZ9L3PjgcqEY78k=",
      "DOJ": "IxkwipBJ+Ogymn/L8qW7SDfKQSOZ9YqW8uQtV2eQRBrY5OK5Hs2cy13hMUbg5hNm6GQK33FLXgMXd0tVPiH6MDe9A77xs9AYqBNtlko+aZvrV56Jr718LezrzVYIPSbmZ1YGnVbNgUoTjYPbFn+U/VRVLsESkMAVbKJc+8NJlzU=",
      "Lattitude": "JjNo6wFLhmlloiBHTbg+fNxO2GzD+3ogGU0sWRPDG/FkqdNFVbUqp4wagPwbpVTA9V2+FzRUJlKVUWW2mWZfsbnSf4emmEB6UyBDMYj1j+43PobimvHYslB8ACooTz82X+ppo/+tt4puABDGhQnfZIGZQ0YoYP7Xzp/2/CYhEcg=",
      "GridStyle": "uy/rO+xjoxEgQkfNY+OX1aFVwcM9Y+4/vz0jHcGSP1ZGnNAHV4blsurYmVR6247LsKpo+M1ewGVKAAwO8JVtA42daiPX6tR9j2Py5pcoe3DlnBUUvbz/PLZ9tW+ln5hupJ6FBMei7ITicH50KXCkGOvwb0d9iU2166pHQfoFqn0=",
      "Longitude": "hbrEDWTQYT+WNrG2Q6DHbiPfR9h928uBOqsbFykNHuA7H70Xz9FalW5mOwepKLCNYqwMsnL0PpWblVaj7To9nH0jjsM3Opu1J73khsug1mk4UQghdyaSodHkC/w7xAKvxbYyjrIubfVeSOicfz5IVDrIIrSOtivgR7is38VlnnE="
    },
    "mobileNumber": "T/my9sVKS4eiqXZLy+etxxo/zBUqQJd6REjBM6UelC0/lngnFCoWPsuHip1GKaMqWlNOsWyerpyTGSJ27XzqWHVEHZEdP4+EZdNyewKTfrqDOvo8Nb9SPAECikGNXENJCtCLxf8KttNk6fWZym+WdVCN/1GFTRlUzeDxb2P/hvU=",
    "isAlreadyRegisteredUser": true,
    "mod": "xTSiS4+I/x9awUXcF66Ffw7tracsQfGCn6g6k/hGkLquHYMFTCYk4mOB5NwLwqczwvl8HkQfDShGcvrm47XHKUzA8iadWdA5n4toBECzRxiCWCHm1KEg59LUD3fxTG5ogGiNxDj9wSguCIzFdUxBYq5ot2J4iLgGu0qShml5vwk=",
    "exp": "AQAB",
    "result": {
      "message": "SUCCESS",
      "code": "00",
      "isactive": false,
      "codedescription": null
    },
    "ChkValue": "cIH6gGm/KCLogq14NvAbNEsS2hR+RzdAApsvaAHojfQ=",
    "otp": "ikAvm3cUlHdJwRv/O9CF7+mXkTJLf+NhhiayLLbI9gNtWZtSgOgqPz0K/jZOcnuWgQkTBS/AEZaEFURt4pfQrgtyq6ujKR8P/4MAV5MXGeieGlETYJcobF2OXqXLiQjc2eyMa8hGpU/qKx7U8QCbqZ3xL7NAq1yuL+LfCyyYWvY=",
    "senderId": "bPmQhK+7+aCL4EPvtf+yHv0zz7Oq5ez+ToEtWTJ8+QKQ0/YvJ6gZG3tUCnkx8qt9f3Mf421YOVdljujNSRJdOB5Ml256H2CVyjnGdvUigiZq/VZkQm3ob1mWf1lO+OAzVk2hbkXEJAl84dJJ6yBaMBmuJyunnl9e6gSgWJJ+C3Y=",
    "isSuccessful": true
  };

  constructor(
    private translate : TranslateService,
    public formBuilder: FormBuilder,
    private cmnUtils: CommanUtils
  ) { }

  ngOnInit() {
  }
  
  checkSeqPatteren() {
    console.log("checkSeqPatteren");
  }

  chnagedInput() {
    var mobileNumber = this.requiredForm.get('mobile')?.value;
    var modifiedValue;
    if (mobileNumber.includes(',')) {
      modifiedValue = mobileNumber.replace(',', '')
    }
    let regexMobile = new RegExp(/^[6789]\d{9}$/);
    let isValid = regexMobile.test(mobileNumber);
    if (mobileNumber.length == 10 && isValid === true) {
      console.log(mobileNumber.length);
      this.isMobileValid = false;
    } else {
      this.isMobileValid = true;
    }
  }

  handleInputNumber(event: any): void {
    const input = event.target.value;
    const filteredInput = input.replace(/[.,-]/g, '');
    this.myNumber = filteredInput;
  }

  handleInputOtp(event: any): void {
    const input = event.target.value;
    const filteredInput = input.replace(/[.,-]/g, '');
    this.otp = filteredInput;
  }


  numberOnlyValidation(event: any) {
    const pattern = /^([0-9])$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  chnagedOtp() {
    var otp = this.requiredForm.get('otp')?.value;
    let regexOtp = new RegExp(/[0-9]{6}/);
    let isValid = regexOtp.test(otp);

    if (otp.length == 6 && isValid === true) {
      console.log(otp.length);
      this.isMobileValid = false;
    } else {
      this.isMobileValid = true;
    }
  }

  onClick(){
    console.log('onClick Clicked');
  }



  // async onClick() {
  //   if (!this.isOtpSend) {
  //     console.log("Mobile Number: " + this.requiredForm.get('mobile')?.value);
  //     this.cmnUtils.showLoading();
  //     this.appRepo.header.param.customerInfo.mobileNo = "91" + this.requiredForm.get('mobile')?.value;
  //     var attributes = {
  //       mobileNumber: "91" + this.requiredForm.get('mobile')?.value,
  //     };
  //     this.appRepo.getApiResponseNotEnc("sendOtp", attributes, "", (res: any) => {
  //       this.cmnUtils.hideLoding();
  //       console.log("sendOtp respone: " + JSON.stringify(res));
  //       this.cmnUtils.submerchantdata = res.attributes.issubmerchant;
  //       this.cmnUtils.submerchmobileno = this.requiredForm.get('mobile')?.value;
  //       var result = res.result;
  //       if (result.code == "00" && result.isactive == true) {
  //         this.isOtpSend = true;
  //         this.isMobileValid = true;
  //         this.startTime = new Date().getTime();
  //         this.readOtp();
  //         this.otp = "";
  //       } else {
  //         this.isOtpSend = false;
  //         this.isMobileValid = false;
  //         alert(this.translate.instant('ALLSTR.mobile_not_registered_contact_manager'));
  //       }
  //     }, (error: any) => {

  //       console.log("error :" + error);
  //       alert(this.translate.instant('Something went wrong please try again later'));
  //       this.isOtpSend = false;
  //       this.cmnUtils.hideLoding();
  //       this.isMobileValid = true;
  //     });
  //   }
  //   else {
  //     console.log("OTP: " + this.otp)
  //     console.log("Mobile Number: " + this.requiredForm.get('mobile')?.value);
  //     this.cmnUtils.showLoading();
  //     var attribute = {
  //       merchantOTP: this.requiredForm.get('otp')?.value,
  //       mobileNumber: "91" + this.requiredForm.get('mobile')?.value,
  //       issubmerchant: this.cmnUtils.submerchantdata
  //     };
  //     this.appRepo.getApiResponseNotEnc("validateOtp", attribute, undefined, (res: any) => {
  //       console.log("validateOtp respone: " + res.mobileNumber);
  //       this.cmnUtils.hideLoding();
  //       if (res.result.code == "00" && res.result.message == "SUCCESS") {
  //         clearInterval(this.intervalId);
  //         this.afterOtpRead(res);
  //       } else {
  //         alert(res.result.codedescription);
  //       }
  //     }, (error: any) => {
  //       console.log("error: " + error);
  //       this.cmnUtils.hideLoding();
  //     });

  //   }

  // }

}
