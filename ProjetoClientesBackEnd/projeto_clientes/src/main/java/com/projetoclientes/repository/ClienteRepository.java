package com.projetoclientes.repository;

import org.springframework.data.repository.CrudRepository;

import com.projetoclientes.model.Cliente;


public interface ClienteRepository extends CrudRepository<Cliente, Long>{

	boolean existsByNomeIgnoreCase(String nome);
    
}
