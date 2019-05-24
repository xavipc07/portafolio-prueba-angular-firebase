import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  constructor(private route: ActivatedRoute, public _productoService: ProductosService) { }

  ngOnInit() {

    this.route.params
      .subscribe( params => {

        console.log(params['termino']);  // termino o la palabra que se haya puesto en el angular routing

        this._productoService.buscarProducto(params['termino']);

      });

  }

}
