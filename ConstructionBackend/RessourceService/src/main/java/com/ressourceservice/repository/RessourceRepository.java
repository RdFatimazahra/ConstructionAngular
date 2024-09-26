package com.ressourceservice.repository;

import com.ressourceservice.model.ressources;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RessourceRepository extends CrudRepository<ressources, Integer> {

    List<ressources> findByIdTache(int idTache);

    Page<ressources> findAll(Pageable pageable);
}
