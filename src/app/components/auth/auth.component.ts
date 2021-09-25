import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Authentication } from 'src/app/services/authentication';
import { faToilet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  faToilet = faToilet;
  isClose = false;
  isLoginMode = true;
  isLoading = false;
  error: string = "";

  constructor(
    private authService: AuthService, 
    private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid) { return; }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode) {
      this.authService.login({email, password} as Authentication).subscribe(
        (resData: any) => {
          console.log(resData);
          this.isLoading = false;
          if(resData) {
            this.router.navigate(['/accueil']); 
          } 
          this.error = "Vous n'êtes pas encore inscrit";
        }, (error: any) => {
          console.log("this is shit" + error);
          this.error = "Une erreur s'est produite";
          this.isLoading = false;
        }
      );
    } else {
      this.isClose = true;
      this.error = "Les inscriptions sont closes";
    }

    form.reset();
  }

}
