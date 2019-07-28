import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ConsultaService } from "../consulta/consulta.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private  consultaService:  ConsultaService,
    private  router:  Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getData();
    
  }

  public getData(){
    return this.http.get('http://localhost:3000/usuarios').subscribe((res) => {
      console.log(res);
      for(let i in res) {
        console.log("res[i]: "+res[i]);
        for( let j in res[i]){
          if(res[i][j]){
          console.log("res [i] [j] ="+res[i][j]);
          }
        }
      }
    });
  }

  login(form){
    this.consultaService.login(form.value).subscribe((res) => {
    this.router.navigateByUrl('formulario');
      
    });
  }

  

}
