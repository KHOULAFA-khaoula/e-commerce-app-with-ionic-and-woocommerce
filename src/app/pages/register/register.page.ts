import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup
  
  constructor( private authService: AuthentificationService,
               private formBuilder: FormBuilder,
               private alertCtrl: AlertController,
               private toastCtrl: ToastController,
               private router: Router) { 
               }

    

  ngOnInit() {
    this.initForm();

    console.log("it login page!!!")
  }

  initForm(){
    this.registerForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password: ['',Validators.required],
      email:['',[ Validators.required , Validators.email]]
    }

    )
  }

  onSignUp(){
          console.log(this.registerForm.value)
          this.authService.signUp(this.registerForm.value.password, this.registerForm.value.username, this.registerForm.value.email).subscribe(
          async res => {
            const toast = await this.toastCtrl.create({
              message: res['message'],
              duration: 2000
            });
            this.router.navigateByUrl('/tabs/home', { replaceUrl: true})
            toast.present()
          },
            err => {
              this.showError(err);
            }
          )
    
    }
  async showError(err) {
    const alert = await this.alertCtrl.create({
      header: err.code,
      //subHeader: err.data.statusCode,
      message: err.message,
      buttons: ['OK']
    });
    await alert.present();
  }


 
}

