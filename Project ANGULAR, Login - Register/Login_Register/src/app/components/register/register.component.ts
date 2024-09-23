import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ){}

  ngOnInit () {
    this.initForm();
  }
  // da se dodadat propertinja ime i prezime
  initForm () {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      userName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      password: new FormControl('', [Validators.required])
    })
  };
  
  submit () {
    console.log(this.registerForm.value)
  const { firstName, lastName, userName, email, cardNumber, password } = this.registerForm.value
   this.authService.register(firstName, lastName, userName, email, cardNumber, password).subscribe((response)=> {
    console.log('Response from register', response);

    if(response){
      this.router.navigate(['/login'])
    }
   })
  };
  
}
