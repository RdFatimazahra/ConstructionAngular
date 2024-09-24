package com.tacheservice.service;

import com.tacheservice.dto.TacheDto;
import com.tacheservice.model.FullTachesResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TacheService {

   // TacheDto createTache(TacheDto tacheDto, int idProjet);

     TacheDto createTache(TacheDto tacheDto, int idProjet);
    //tache createTache(tache tache, int idProjet);
     TacheDto getTacheById(int id);
    List<TacheDto> getAllTaches();
//    List<TacheDto> getTachesByProjetId(int projetId);
    TacheDto updateTache(int id, TacheDto tacheDto);
    void deleteTache(int id);
    List<TacheDto> getTachesByProjet(int idProjet);
    FullTachesResponse tachWithRessources(int id);
    public void deleteTachesByProjetId(int idProjet);
    Page<TacheDto> getAllTachesWithPagination(Pageable pageable);
    Page<TacheDto> getTachesSortedByFieldAsc(String field, Pageable pageable);
    Page<TacheDto> getTachesSortedByFieldDesc(String field, Pageable pageable);
}
