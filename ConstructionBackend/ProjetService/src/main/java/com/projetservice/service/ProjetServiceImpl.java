package com.projetservice.service;

import com.projetservice.client.TacheClient;
import com.projetservice.dto.projetDto;
import com.projetservice.mapper.ProjetMapper;
import com.projetservice.model.FullProjectResponse;
import com.projetservice.model.Taches;
import com.projetservice.model.Projet;
import com.projetservice.repository.ProjetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;

@Service
public class ProjetServiceImpl implements ProjetService {

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private ProjetMapper projetMapper;

    @Autowired
    TacheClient tacheClient;

    @Override
    public projetDto createProjet(projetDto projetDto) {
        Projet projetEntity = projetMapper.projetDtoToProjet(projetDto);
        Projet savedProjet = projetRepository.save(projetEntity);
        return projetMapper.projetToProjetDto(savedProjet);
    }

    @Override
    public projetDto getProjetById(int id) {
        Projet projetEntity = projetRepository.findById(id).orElse(null);
        return projetMapper.projetToProjetDto(projetEntity);
    }

    @Override
    public List<projetDto> getAllProjets() {
        List<Projet> projets = projetRepository.findAll();
        return projets.stream()
                .map(projetMapper::projetToProjetDto)
                .collect(Collectors.toList());
    }

    @Override
    public projetDto updateProjet(int id, projetDto projetDto) {
        Projet existingProjet = projetRepository.findById(id).orElse(null);
        if (existingProjet != null) {
            Projet updatedProjet = projetMapper.projetDtoToProjet(projetDto);
            updatedProjet.setIdProjet(id); // Ensure the ID remains the same
            projetRepository.save(updatedProjet);
            return projetMapper.projetToProjetDto(updatedProjet);
        }
        return null;
    }

    @Override
    // Supprimer un projet existant
    public void deleteProjet(int id) {

        try {
            // D'abord, supprimer les tâches liées à ce projet
            tacheClient.deleteTachesByProjetId(id);
        } catch (Exception e) {
            throw new IllegalStateException("Erreur lors de la suppression des tâches pour l'ID du projet : " + id, e);
        }

        // Ensuite, supprimer le projet
        projetRepository.deleteById(id);
    }


    @Override
    public FullProjectResponse projetWithTaches(int id) {
        Projet projets = projetRepository.findById(id)
                .orElse(
                        Projet.builder()
                                .nomProjet("NOT_FOUND")
                                .build()
                );
        List<Taches> taches = tacheClient.findAllTachesByProjet(id);
        return FullProjectResponse.builder()
                .nomProjet(projets.getNomProjet())
                .dateDebut(projets.getDateDebut())
                .dateFin(projets.getDateFin())
                .description(projets.getDescription())
                .budget(projets.getBudget())
                .taches(taches)
                .build();
    }

    //Sorting ASC Method:
    public List<projetDto> findProjectWithSortingAsc(String field) {
      List<Projet> projets=  projetRepository.findAll(Sort.by(Sort.Direction.ASC,field));
        return projets.stream()
                .map(projetMapper::projetToProjetDto)
                .collect(Collectors.toList());
    }

    //Sorting ASC Method:
    public List<projetDto> findProjectWithSortingDesc(String field) {
        List<Projet> projets=  projetRepository.findAll(Sort.by(Sort.Direction.DESC,field));
        return projets.stream()
                .map(projetMapper::projetToProjetDto)
                .collect(Collectors.toList());
    }



    // Pagination method in the service class
    public Page<projetDto> findProjetsWithPagination(int offset, int pageSize) {
        // Fetch the paginated data from the repository
        Page<Projet> projetsPage = projetRepository.findAll(PageRequest.of(offset, pageSize));

        // Convert the Page<Projet> to Page<ProjetDto> using map()
        return projetsPage.map(projetMapper::projetToProjetDto);
    }

}

