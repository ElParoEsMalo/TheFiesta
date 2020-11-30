import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListEventPage } from './list-event.page';

describe('ListEventPage', () => {
  let component: ListEventPage;
  let fixture: ComponentFixture<ListEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
