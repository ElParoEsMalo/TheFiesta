import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyTicektPage } from './buy-ticekt.page';

describe('BuyTicektPage', () => {
  let component: BuyTicektPage;
  let fixture: ComponentFixture<BuyTicektPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTicektPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyTicektPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
