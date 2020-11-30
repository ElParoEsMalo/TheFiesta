import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistUserProfilePage } from './regist-user-profile.page';

describe('RegistUserProfilePage', () => {
  let component: RegistUserProfilePage;
  let fixture: ComponentFixture<RegistUserProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistUserProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistUserProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
