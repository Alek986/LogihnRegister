import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
[x: string]: any;

loginForm: FormGroup

constructor (private readonly authService:AuthService, private readonly router: Router) {}

ngOnInit () {
  this.initForm();
}

initForm () {
  this.loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required])
  })
};

submit () {
  console.log(this.loginForm.value)
  const { userName, password } = this.loginForm.value
  this.authService.login(userName, password).subscribe((response) => {
    console.log(response);
    if(response){
      this.router.navigate(['/'])
    };
  })
}
}
