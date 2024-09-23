package com.projetservice.service;

import com.projetservice.dto.projetDto;
import com.projetservice.model.FullProjectResponse;
import com.projetservice.model.Projet;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProjetService {

        projetDto createProjet(projetDto projetDto);
        projetDto getProjetById(int id);
        List<projetDto> getAllProjets();
        projetDto updateProjet(int id, projetDto projetDto);
        void deleteProjet(int id);
        FullProjectResponse projetWithTaches(int id);
        List<projetDto> findProjectWithSortingAsc(String field);
        List<projetDto> findProjectWithSortingDesc(String field);
        Page<projetDto> findProjetsWithPagination(int offset, int pageSize);

}

