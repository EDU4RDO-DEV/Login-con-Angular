import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NavComponent } from './nav.component';
import { By } from '@angular/platform-browser';
import { LoginService } from 'src/app/services/auth/login.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  // Simula el servicio AuthService
  const authServiceMock = {
    user: of(null) // Asume que el usuario no está logueado inicialmente
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers: [
        { provide: LoginService, useValue: authServiceMock }
      ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show navbar if user is not logged in', () => {
    const navbar = fixture.debugElement.query(By.css('nav'));
    expect(navbar).toBeNull();
  });

  it('should show navbar if user is logged in', () => {
    authServiceMock.user = of(null); // Simula que el usuario no está logueado
    fixture.detectChanges();
    const navbar = fixture.debugElement.query(By.css('nav'));
    expect(navbar).not.toBeNull();
  });
});