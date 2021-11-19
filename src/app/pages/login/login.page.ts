import { AuthentificationService } from './../../services/authentification.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;

  consumer: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthentificationService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }


  ngOnInit() {
    this.initForm();

    console.log("it login page!!!")
  }

  initForm(){
    this.authForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password: ['',Validators.required]
    }

    )
  }

 async  onSignIn(){
        const loading = await this.loadingCtrl.create({
          message:'Connecting...',
        });
        await loading.present()

        console.log(this.authForm.value)

        this.authService.signIn(this.authForm.value.password, this.authForm.value.username).subscribe(
        async (res) => {
          await loading.dismiss();
          
          this.router.navigateByUrl('/tabs/home', { replaceUrl: true})
          },
          async (err) => {
            console.log(err)
            await loading.dismiss();
            const alert = await this.alertCtrl.create({
              header:'Login failed',
              message: err.error.code,
              buttons: ['OK'],
            })

          await alert.present();
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

  onMoveRegister() {
    console.log('registee !!!!')
     this.router.navigateByUrl('/register')
  }

}
