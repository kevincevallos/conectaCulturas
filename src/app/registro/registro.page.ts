import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService } from '../consulta/consulta.service'
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(
    private consulta: ConsultaService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(form) {
    this.consulta.registro(form.value).subscribe((res) => {
      this.router.navigateByUrl('home');
    });
  }

}
