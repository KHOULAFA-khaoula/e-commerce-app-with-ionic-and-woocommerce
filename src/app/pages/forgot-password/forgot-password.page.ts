import { AuthentificationService } from './../../services/authentification.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  pwdForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthentificationService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) { }

  
  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.pwdForm = this.formBuilder.group({
      usernameOrEmail:['',[Validators.required]],
     
    }

    )
  }

  onResetPwd() {
    console.log("loginUSer ", this.pwdForm.value.usernameOrEmail)
    this.authService.resetPassword(this.pwdForm.value.usernameOrEmail).subscribe(
      async res => {
        const toast = await this.toastCtrl.create({
              message : res['message'],
              duration: 3000,
        });
        toast.present()
      },
      err =>  {
        this.showError(err)
      });
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
