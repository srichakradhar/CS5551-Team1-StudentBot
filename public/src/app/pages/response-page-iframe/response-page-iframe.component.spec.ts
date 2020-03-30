import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsePageIframeComponent } from './response-page-iframe.component';

describe('ResponsePageIframeComponent', () => {
  let component: ResponsePageIframeComponent;
  let fixture: ComponentFixture<ResponsePageIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsePageIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsePageIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
