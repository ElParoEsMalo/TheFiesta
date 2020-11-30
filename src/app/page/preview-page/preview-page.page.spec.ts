import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviewPagePage } from './preview-page.page';

describe('PreviewPagePage', () => {
  let component: PreviewPagePage;
  let fixture: ComponentFixture<PreviewPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
