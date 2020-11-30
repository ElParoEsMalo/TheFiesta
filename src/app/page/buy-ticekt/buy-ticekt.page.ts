import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var paypal;

@Component({
  selector: 'app-buy-ticekt',
  templateUrl: './buy-ticekt.page.html',
  styleUrls: ['./buy-ticekt.page.scss'],
})
export class BuyTicektPage implements OnInit {

    @ViewChild('paypal', { static: true}) paypalElement:ElementRef;
    
  constructor() { }

  product = {
    price: 777.77,
    description: 'used couch, decent condition',
    img: 'f'
  };

  paidFor = false;

  ngOnInit() {
    paypal
      .Buttons()
      .render(this.paypalElement.nativeElement);
  }

}
