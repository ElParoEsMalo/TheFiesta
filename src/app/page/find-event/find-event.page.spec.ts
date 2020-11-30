import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindEventPage } from './find-event.page';

describe('FindEventPage', () => {
  let component: FindEventPage;
  let fixture: ComponentFixture<FindEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
