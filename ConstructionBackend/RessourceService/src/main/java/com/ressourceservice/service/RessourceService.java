package com.ressourceservice.service;

import com.ressourceservice.Dto.RessourceDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RessourceService {
    RessourceDto createRessource(RessourceDto ressourceDto, int idTache);
    RessourceDto getRessourceById(int id);
    List<RessourceDto> getAllRessources();
    List<RessourceDto> getRessourcesByTacheId(int idTache);
    RessourceDto updateRessource(int id, RessourceDto ressourceDto);
    void deleteRessource(int id);
    Page<RessourceDto> getAllRessWithPagination(Pageable pageable);
    Page<RessourceDto> getRessSortedByFieldAsc(String field, Pageable pageable);
    Page<RessourceDto> getRessSortedByFieldDesc(String field, Pageable pageable);
}
