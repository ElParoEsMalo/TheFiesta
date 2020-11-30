import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabsFriendPage } from './tabs-friend.page';

describe('TabsFriendPage', () => {
  let component: TabsFriendPage;
  let fixture: ComponentFixture<TabsFriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsFriendPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsFriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
