import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {

      this.http.get('https://angular-html-firebase.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {

          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });

  }

  getProducto(id: string) {

    return this.http.get(`https://angular-html-firebase.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino: string) {
    //Cargar productos
    if (this.productos.length === 0) {

      this.cargarProductos().then(() => {
        // ejecugar después de tener los productos
        // aplicar filtro
        this.filtrarProductos(termino);
      });

    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {

    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >=0 ) {
        this.productosFiltrado.push(prod)
      }
    });
  }

}
