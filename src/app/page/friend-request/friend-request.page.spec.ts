import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FriendRequestPage } from './friend-request.page';

describe('FriendRequestPage', () => {
  let component: FriendRequestPage;
  let fixture: ComponentFixture<FriendRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FriendRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
