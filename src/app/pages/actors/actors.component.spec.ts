import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActorsComponent } from './actors.component';

describe('FrontpageComponent', () => {
  let component: ActorsComponent;
  let fixture: ComponentFixture<ActorsComponent>;
  let mockService = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorsComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
