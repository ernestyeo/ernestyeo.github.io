import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm!: FormGroup;
  results: any = false;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      username: '',
      password: ''
    });
  }

  onSubmit() {
    this.authService.authUser(this.myForm.value.username,
      this.myForm.value.password).subscribe(data => {
        this.results = data;
        if (this.results[0].auth) {
          this.authService.setSecureToken(this.myForm.value.username);
          this.authService.setUserRole(this.results[0].role);
          this.router.navigateByUrl('/profile');
          console.log('user signed in')
        } else {
          console.log("Wrong username or password")
        }
      });
  }

}
