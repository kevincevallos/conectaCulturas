import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { Usuario } from  './usuario';
import { ConsultaResponse } from  './consulta-response';
@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  public photos: Photo[] = [];
  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3000';
  authSubject  =  new  BehaviorSubject(false);
  constructor(
    private  httpClient:  HttpClient,
    private  storage:  Storage
     ) { }

     registro(usuario: Usuario): Observable<ConsultaResponse> {
      return this.httpClient.post<ConsultaResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, usuario).pipe(
        tap(async (res:  ConsultaResponse ) => {
  
          if (res.usuario) {
            await this.storage.set("ACCESS_TOKEN", res.usuario.access_token);
            await this.storage.set("EXPIRES_IN", res.usuario.expires_in);
            this.authSubject.next(true);
          }
        })
  
      );

}

async data(){
await this.httpClient.get('http://localhost:3000/usuarios').subscribe((response) => {
  console.log(response);
  for(let i in response) {
    console.log(i);
  }
});
}

login(usuario: Usuario): Observable<ConsultaResponse>{

return this.httpClient.get("http://localhost:3000/usuarios/count/"+"'"+usuario.nombre+"'"+"/"+"'"+usuario.password+"'").pipe(
  tap(async (res: ConsultaResponse) => {

    console.log(res);
    for(let i in res) {
      console.log("res[i]: "+res[i]);
      for( let j in res[i]){
        console.log("res [i] [j] ="+res[i][j]);
       
      }
    }

    /*for(let i in res) {
      console.log("res[i]: "+res[i]);
      for( let j in res[i]){
        if(res[i][j]!=usuario.nombre&&res[i][j]!=usuario.password){
        console.log("res [i] [j] ="+res[i][j]);
        console.log("usuario y contraseña incorrectos!!");
        }else{
        await this.storage.set("ACCES_TOKEN", res.usuario.access_token);
        await this.storage.set("EXPIRES_IN", res.usuario.expires_in);
        this.authSubject.next(true);
      }
      }
    }*/

          })
      );
}

async logout(){
  await this.storage.remove("ACCESS_TOKEN");
  await this.storage.remove("EXPIRES_IN");
  this.authSubject.next(false);
}

isLoggedIn() {
  return this.authSubject.asObservable();
}

}
class Photo {
  data: any;
}