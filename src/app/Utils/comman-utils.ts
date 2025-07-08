import { Injectable } from "@angular/core";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";

@Injectable({
    providedIn: "root"
})
export class CommanUtils {
    loginresponse: any;
    submerchmobileno = "";
    submerchantdata: any;
    public isBank = true;
    public subscriptionId = -1;
    public simIccId = "";
    public simSlotIndex = -1;
    token: string = "";
    USER: any = null;
    USERINFO = "userInfo";
    userData = {
        "userInfo": {
            "profileId": "6240",
            "mobileNo": "917987112820",
            "firstName": "MerchantSK",
            "lastName": "",
            "email": "Sk@gmail.com",
            "dob": "",
            "authToken": "M0QzODQzMjYtRDc3RC00Q0RCLUJCNjAtN0IxNzJFNEQwODc1MC43MTU0Mzc=",
            "authTokenExpiryTs": "5/24/2024 6:30:20 PM",
            "createDateTime": "2/5/2024 11:42:03 AM",
            "defaultLanguage": "",
            "dashBoardLayoutStyle": "List",
            "isAlreadyRegisteredUser": "1",
            "isVpaExists": "1",
            "isAccountLinked": "1",
            "defaultAccountNumber": "",
            "IsPinSet": "1",
            "IsBlocked": "False",
            "issubmerchant": "",
            "submerchmobileno": ""
        },
        "mobileNumber": "917987112820",
        "isAlreadyRegisteredUser": "true",
        "mod": "uBXoRqI2L3FHp4GoCjRkLoxjC8lEohXpHpZrNZCtfg1lmlJQyZJOiEV7Wkf3YXcRy/B31ahvj3SI5nIaXz58QLXRLKtv4g3amw07DBnliv9l5iw6zKbPhuQ04DMgEYA7ODa9F0yf5slUxQCh11tzn2aGs5hSULRSHqOdC3BwLkY=",
        "exp": "AQAB",
        "result": {
            "message": "SUCCESS",
            "code": "00",
            "isactive": "true",
            "codedescription": "",
            "token": "318E26474E0C40FEAD92275A273256EF555D972BF0ADE1CC2731D0BCA9E68C312E6983BBED8EBE4371B9058DB911D251BD23DECB8F64F8C47614A0494248B7570FC3C021838E3B8D9E72F9E13DEF5E55E189AC6011CFC963D1FD77639FEC1B3B",
            "isexpired": "null"
        },
        "senderId": "917987112820",
        "isSuccessful": "true",
        "ChkValue": "Cx+goMzQXV0okUUm/lWn2rCy5JfS2Bxzefk7c62c3VY="
    }
    storeData = [

        {
            "storeID": "MerchantSK",
            "storeName": "MerchantSK",
            "storeAccount": "058501000012347",
            "storeAddress": "pune418765",
            "storeContact": "917987112820",
            "BusinessType": "Local and Sub urban commuter passenger transportation, including ferries",
            "city": "",
            "storeVPA": [
                {
                    "VPAID": "SBF9F3904FF845",
                    "VPA": "MerchantSK@iob",
                    "qrImage": "data:image/png;base64,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"
                },
                {
                    "VPAID": "SBF9F3904FF845",
                    "VPA": "MerchantSKs@iob",
                    "qrImage": "data:image/png;base64,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"
                }
            ]
        }

    ];
    loading: any;
    public isWifiNetwork = false;
    MOD = "xTSiS4+I/x9awUXcF66Ffw7tracsQfGCn6g6k/hGkLquHYMFTCYk4mOB5NwLwqczwvl8HkQfDShGcvrm47XHKUzA8iadWdA5n4toBECzRxiCWCHm1KEg59LUD3fxTG5ogGiNxDj9wSguCIzFdUxBYq5ot2J4iLgGu0qShml5vwk=";
    Exponent = "AQAB";
    dd = "g1WAWI4pEK9TA7CA2Yyy/2FzzNiu0uQCuE2TZYRNiomo96KQXpxwqAzZLw+VDXfJMypwDMAVZe/SqzSJnFEtZxjdxaEo3VLcZ1mnbIL0vS7D6iFeYutF9kF231165qGd3k2tgymNMMpY7oYKjS11Y6JqWDU0WE5hjS2X35iG6mE=";
    isPopupOpen = false;

    constructor(private loadingCtrl: LoadingController, private toast: ToastController,
        private alertController: AlertController,) {

    }




    public replaceAllChar(str: any) {
        if (str == "") {
            return str;
        } else {
            return str.replace(/[^0-9 ]/g, "")
        }
    }

    public replaceLast3Char(str: any) {
        if (str != "") {
            return str.slice(0, -3);
        } else {
            return str;
        }

    }

    public returnMobileNid(userInfo: any) {

        if (userInfo.MyLanguage.toLowerCase() == "hindi") {
            return userInfo.GridStyle;
        }

        else if (userInfo.MyLanguage.toLowerCase() == "english") {
            return userInfo.DOJ;
        }
        else if (userInfo.MyLanguage.toLowerCase() == "bengali") {
            return userInfo.Lattitude;
        }

        else if (userInfo.MyLanguage.toLowerCase() == "telgu") {
            return userInfo.Longitude;
        }

        else if (userInfo.MyLanguage.toLowerCase() == "marathi") {
            return userInfo.AlternateEmail;
        }



    }

    async showLoading() {
        this.loading = await this.loadingCtrl.create({
            translucent: true,
            keyboardClose: true,
            backdropDismiss: false,
            cssClass: 'myLoader',
            duration: 300000,
            spinner: 'circles'
        });

        this.loading.present();
    }

    async hideLoding() {
        this.loading.dismiss();
    }



    async presentAlertConfirmOk(message: string, header: any, okText: any, autoDissmiss: boolean | null | undefined, handler: any) {
        const alertbuilder = await this.alertController.create({
            header: header,
            message: message,
            cssClass: 'myAlert',
            buttons: [
                {
                    text: okText,
                    handler: handler
                },

            ],
            backdropDismiss: autoDissmiss == null ? true : autoDissmiss
        });

        alertbuilder.addEventListener('ionAlertWillPresent', () => {
            this.isPopupOpen = true;
        })
        alertbuilder.addEventListener('ionAlertDidDismiss', () => {
            this.isPopupOpen = false;
        })
        return await alertbuilder.present();
    }

    async presentAlertConfirmOkCancel(message: string, header: any, okText: string, cancleText: string, autoDissmiss: any, handler: any, canleHandler: any) {
        const alertbuilder = await this.alertController.create({
            header: header,
            message: message,
            cssClass: 'myAlert',
            buttons: [
                {
                    text: cancleText,
                    role: 'cancel',
                    handler: canleHandler,


                },
                {
                    text: okText,
                    handler: handler,


                }

            ],
            backdropDismiss: autoDissmiss
        });

        alertbuilder.addEventListener('ionAlertWillPresent', () => {
            this.isPopupOpen = true;
        })
        alertbuilder.addEventListener('ionAlertDidDismiss', () => {
            this.isPopupOpen = false;
        })
        return await alertbuilder.present();
    }

    async presentAlertConfirmOkCanceln(message: string, header: any, okText: string, cancleText: string, autoDissmiss: any, handler: any, canleHandler: any) {
        const alertbuilder = await this.alertController.create({
            header: header,
            message: message,
            cssClass: 'myAlert',
            buttons: [
                {
                    text: cancleText,
                    role: 'cancel',
                    handler: canleHandler,


                },
                {
                    text: okText,
                    handler: handler,


                }

            ],
            backdropDismiss: autoDissmiss
        });

        alertbuilder.addEventListener('ionAlertWillPresent', () => {
            this.isPopupOpen = true;
        })
        alertbuilder.addEventListener('ionAlertDidDismiss', () => {
            this.isPopupOpen = false;
        })
        return await alertbuilder.present();
    }



    async presentAlertTwoButtons(message: string, header: any, okText: any, secbtnbuttnText: any, autoDissmiss: any, handler: any, secbutHandler: any) {
        const alertbuilder = await this.alertController.create({
            header: header,
            message: message,
            cssClass: 'myAlert',
            buttons: [
                {
                    text: secbtnbuttnText,
                    handler: secbutHandler,

                },
                {
                    text: okText,
                    handler: handler
                }

            ],
            backdropDismiss: autoDissmiss
        });

        alertbuilder.addEventListener('ionAlertWillPresent', () => {
            this.isPopupOpen = true;
        })
        alertbuilder.addEventListener('ionAlertDidDismiss', () => {
            this.isPopupOpen = false;
        })
        return await alertbuilder.present();
    }

    async presentAlertConfirmOkCancelHandler(message: string, header: any, okText: any, autoDissmiss: any, handler: any, cancleHandler: any) {
        const alertbuilder = await this.alertController.create({
            header: header,
            message: message,
            cssClass: 'myAlert',
            buttons: [
                {
                    text: "Cancel",
                    role: 'cancel',
                    handler: cancleHandler

                },
                {
                    text: okText,
                    handler: handler
                }

            ],
            backdropDismiss: autoDissmiss
        });

        alertbuilder.addEventListener('ionAlertWillPresent', () => {
            this.isPopupOpen = true;
        })
        alertbuilder.addEventListener('ionAlertDidDismiss', () => {
            this.isPopupOpen = false;
        })
        return await alertbuilder.present();
    }

    async presentAlertConfirmOkBtnsHandler(message: string, header: any, okText: any, btnText: any, autoDissmiss: any, handler: any, cancleHandler: any) {
        const alertbuilder = await this.alertController.create({
            header: header,
            message: message,
            cssClass: 'myAlert',
            buttons: [
                {
                    text: btnText,
                    handler: cancleHandler

                },
                {
                    text: okText,
                    handler: handler
                }

            ],
            backdropDismiss: autoDissmiss
        });

        alertbuilder.addEventListener('ionAlertWillPresent', () => {
            this.isPopupOpen = true;
        })
        alertbuilder.addEventListener('ionAlertDidDismiss', () => {
            this.isPopupOpen = false;
        })
        return await alertbuilder.present();
    }

    async presentToast(message: string) {
        const toast = await this.toast.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.present();
    }

}
