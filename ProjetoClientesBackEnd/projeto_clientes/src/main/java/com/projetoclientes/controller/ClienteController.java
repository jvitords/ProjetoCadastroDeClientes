package com.projetoclientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.projetoclientes.model.Cliente;
import com.projetoclientes.repository.ClienteRepository;

@RestController
@CrossOrigin(origins = "*") 
public class ClienteController {

    @Autowired
    private ClienteRepository repository;

    @PostMapping("/")
    public Cliente cadastrar(@RequestBody Cliente cliente){
        boolean clienteExiste = repository.existsByNomeIgnoreCase(cliente.getNome());
        
        if (clienteExiste) {
            throw new IllegalArgumentException("Já existe um cliente com esse nome.");
        }

        return repository.save(cliente);
    }

    
    @GetMapping("/")
    public Iterable<Cliente> selecionar(){
        return repository.findAll();
    }

    @PutMapping("/")
    public Cliente editar(@RequestBody Cliente cliente){
        return repository.save(cliente);
    }

    @DeleteMapping("/{codigo}")
    public void remover(@PathVariable long codigo){
        repository.deleteById(codigo);
    }

}