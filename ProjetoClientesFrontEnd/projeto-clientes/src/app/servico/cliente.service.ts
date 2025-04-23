import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../modelo/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  // URL do back end
  private url: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  selecionar(): Observable<Cliente[]> {
    // ele avisa o subscrive(está no principal.component) quando o get terminar de receber as info do back
    return this.http.get<Cliente[]>(this.url);
  }

  cadastrar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }

  editar(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url, cliente);
  }

  remover(codigo: number): Observable<void> {
    return this.http.delete<void>(this.url + '/' + codigo);
  }
}
