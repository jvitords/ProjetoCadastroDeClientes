import { CommonModule } from '@angular/common';
import { Cliente } from '../modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Sem HttpClientModule aqui
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})
export class PrincipalComponent {
  // objeto Cliente
  cliente = new Cliente();

  // visibilidade dos botões(cuida do ngIf na class principal.html)
  btnCadastro: boolean = true;

  // visibilidade da tabela(cuida do ngIf na class principal.html)
  tabela: boolean = true;

  // lista de clientes
  clientes: Cliente[] = [];

  // construtor para receber o service
  constructor(private servico: ClienteService) {}

  // onde recebe todos os clientes do back que vem do service
  selecionar(): void {
    this.servico.selecionar().subscribe((retorno) => (this.clientes = retorno)); // o subscrive é quem chama a função do service
  }

  // metodo para cadastrar novo cliente
  cadastrar(): void {
    this.servico.cadastrar(this.cliente).subscribe({
      next: (retorno) => {
        this.clientes.push(retorno);
        this.cliente = new Cliente();
        alert('Cliente cadastrado com sucesso!');
      },
      error: (erro) => {
        if (erro.error && erro.error.message) {
          alert('Erro: ' + erro.error.message); // Mensagem personalizada do backend
        } else {
          alert('Erro ao cadastrar cliente.');
        }
      },
    });
  }

  selecionarCliente(posicao: number): void {
    // escolhendo cliente
    this.cliente = this.clientes[posicao];

    // tirando a visibilidade dos botões
    this.btnCadastro = false;

    // tirando a visibilidade dos botões
    this.tabela = false;
  }

  editarCliente(): void {
    this.servico.editar(this.cliente).subscribe((retorno) => {
      // obter posição do cliente
      let posicao = this.clientes.findIndex((obj) => {
        return obj.codigo == retorno.codigo;
      });
      // alterar dados do cliente
      this.clientes[posicao] = retorno;

      this.cliente = new Cliente();

      // visibilidade dos botões e da tabela
      this.btnCadastro = true;
      this.tabela = true;

      alert('Cliente alterado com sucesso!');
    });
  }

  removerCliente(): void {
    this.servico.remover(this.cliente.codigo).subscribe((retorno) => {
      // obter o cliente
      let posicao = this.clientes.findIndex((obj) => {
        return obj.codigo == this.cliente.codigo;
      });
      // alterar dados do cliente
      this.clientes.splice(posicao, 1);

      this.cliente = new Cliente();

      // visibilidade dos botões e da tabela
      this.btnCadastro = true;
      this.tabela = true;

      alert('Cliente removido com sucesso!');
    });
  }

  botaoCancelar(): void {
    this.cliente = new Cliente();
    this.btnCadastro = true;
    this.tabela = true;
  }

  // assim que inicia a aplicação, chama a função selecionar
  ngOnInit() {
    this.selecionar();
  }
}
