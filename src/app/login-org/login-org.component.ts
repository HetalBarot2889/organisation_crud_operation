import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-org',
  templateUrl: './login-org.component.html',
  styleUrls: ['./login-org.component.css']
})
export class LoginOrgComponent implements OnInit {
  loginData: any = {};
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'organizationUrl': new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  login() {
    this.loginData = this.loginForm.value;
    console.log("data => ", this.loginData);
    this.router.navigate(['/list']);
    this.authService.loginForm(this.loginData).subscribe(response => {
      if (response.status === 'success') {
        this.authService.setUser(response);
      }
    }, error => {
      console.error(error);
    });

  }
}
