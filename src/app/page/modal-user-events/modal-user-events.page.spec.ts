import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalUserEventsPage } from './modal-user-events.page';

describe('ModalUserEventsPage', () => {
  let component: ModalUserEventsPage;
  let fixture: ComponentFixture<ModalUserEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUserEventsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalUserEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
