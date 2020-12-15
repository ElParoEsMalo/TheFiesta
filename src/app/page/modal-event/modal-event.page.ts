
import { Event } from 'src/app/core/models/evento';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { MapService } from 'src/app/servicios/map/map.service';
import { FirebaseServiceService } from 'src/app/servicios/firebaseServ/firebase-service.service';

@Component({
  selector: 'app-modal-event',
  templateUrl: './modal-event.page.html',
  styleUrls: ['./modal-event.page.scss']
})
export class ModalEventPage implements OnInit {
  event: Event;
  ocupated: number;
  disableBoton = true;
  constructor(private modalCtrl: ModalController, private params: NavParams
            , private payPal: PayPal, private firebaseServ: FirebaseServiceService, private mapServ: MapService) {
    this.event = this.params.get('event');
    console.log(this.event);
    this.ocupated = this.event.users.length;
    const user = firebaseServ.localUser;
    if (this.event.users.indexOf(user.idUsuario) < 0) {
      this.disableBoton = false;
    }
    console.log(this.disableBoton);
  }

  ngOnInit() {}
  dismiss() {
    this.modalCtrl.dismiss();
  }
  show() {
    console.log('show');
    console.log(this.event);
    const array: Event[] = [];
    array.push(this.event);
    this.mapServ.show(array);
    this.modalCtrl.dismiss();
  }
  buyTicket() {
    console.log('BUY TICKET_   ');
    console.log(this.event);
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AZzTTsQVBJBhFDN6y5MhNTCY5F1NHxA866jhtZMrciYwvPBF1OYZAJIl7gAFPx_daSSZeNlZVZgPJVzU'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        // payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        const payment = new PayPalPayment(this.event.price + '', 'USD', this.event.name, 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          this.firebaseServ.buyTicket(this.event);
          this.disableBoton = true;
        }, () => {
          console.log('error pago');
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
        console.log('error Config');
      });
    }, (error) => {
      console.log(error);
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}
