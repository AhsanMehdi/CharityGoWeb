import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AlertService } from '../../services/alert.service';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signinpage',
  templateUrl: './signinpage.component.html',
  styleUrls: ['./signinpage.component.scss']
})
export class SigninPageComponent implements OnInit {
  signInForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backendService: BackendService,
    private alertService: AlertService
  ) {

    this.signInForm = fb.group({
      useremail: new FormControl({ value: "", disabled: false }, [
        Validators.required,
        Validators.email,
      ]),

      userpassword: new FormControl({ value: "", disabled: false }, [
        Validators.required,
      ])
    
    });
  }

  ngOnInit() {
  }
   // -----ng onint ends 
 signinformshow:boolean=true;
 userSingIn(){
  this.signinformshow=true;

}

 // convenience getter for easy access to form fields
 get f() { return this.signInForm.controls; }

 onSignInSubmit() {
  this.submitted = true;


  let email = this.signInForm.get("useremail").value;
  let password = this.signInForm.get("userpassword").value;

  let signIn = {
    email: email,
    password:password
  }

  console.log(signIn)
  this.loading = true;
  this.backendService.signIn(signIn)
      .pipe(first())
      .subscribe(
          data => {

            console.log(data.token)

            localStorage.setItem('token', data.token);
            localStorage.setItem('userid',data.user._id)
            localStorage.setItem('userType',data.user.userType)
              this.alertService.success('Registration successful', true);
            if (data.user.userType === "donor") // it select who is login currently
            {
              localStorage.setItem("role",data.user.userType)
              this.router.navigate(['/donorhome']);
            }
            else if (data.user.userType === "ngo") // it select who is signup
            {
              localStorage.setItem("role",data.user.userType)
              this.router.navigate(['/nghome']);
            } 
              console.log (this.signInForm.value);
          },
          error => {
      
              this.alertService.error(error);
              console.log ("invalid email or password")
              this.loading = false;
          });
}
}
