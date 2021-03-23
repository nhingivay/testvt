import {
  Component,
  ElementRef,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from './login.interface';
import { PostService } from './../getData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  model: LoginInterface = new LoginInterface();

  showPassword = false;
  profileData: any;
  modelConfirmPassword: any;
  modelPassword: any;
  constructor(
    private _formBuilder: FormBuilder,
    private el: ElementRef,
    private router: Router,
    private postService: PostService
  ) {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  /**
   * On init
   */
  ngOnInit(): void {}

  // SignIn
  signIn = (): void => {
    console.log(444, this.loginForm.get('username'));

    this.model = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      for (const key of Object.keys(this.loginForm.controls)) {
        if (this.loginForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector(
            '[formcontrolname="' + key + '"]'
          );
          if (invalidControl) {
            if (invalidControl.querySelector('input')) {
              invalidControl.querySelector('input').focus();
            } else {
              invalidControl.focus();
            }
            break;
          }
        }
      }
    } else {
      this.postService
        .Post('http://202.182.111.45:8081/v1/auth/login', this.model)
        .subscribe((res) => {
          if (res && res.status == 0) {
            alert('Đăng nhập thành công');
            localStorage.setItem('token', res.data.access_token);
            console.log(333, res);

            this.router.navigate(['/user']);
          } else {
            alert('Tài khoản hoặc mật khẩu không chính xác !');
          }
        });
    }
  };

  // enter signin
  enterSignIn = (e: any): void => {
    setTimeout(() => {
      if (
        e.keyCode === 13 &&
        this.model.username &&
        this.model.password &&
        this.model.username.length > 0 &&
        this.model.password.length > 0
      ) {
        this.signIn();
      }
    }, 0);
  };
}
