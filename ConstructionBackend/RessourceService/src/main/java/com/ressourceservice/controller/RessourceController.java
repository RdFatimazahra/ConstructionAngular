package com.ressourceservice.controller;

import com.ressourceservice.Dto.RessourceDto;
import com.ressourceservice.service.RessourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ressources")
public class RessourceController {

    @Autowired
    private RessourceService ressourceService;

    // Create a new resource
    @PostMapping("/tache/{tacheId}")
    public ResponseEntity<RessourceDto> createRessource(@PathVariable int tacheId, @RequestBody RessourceDto ressourceDto) {
        RessourceDto createdRessource = ressourceService.createRessource(ressourceDto, tacheId);
        return ResponseEntity.ok(createdRessource);
    }

    // Get a resource by ID
    @GetMapping("/{id}")
    public ResponseEntity<RessourceDto> getRessourceById(@PathVariable int id) {
        RessourceDto ressource = ressourceService.getRessourceById(id);
        return ResponseEntity.ok(ressource);
    }

    // Get all resources
    @GetMapping
    public ResponseEntity<List<RessourceDto>> getAllRessources() {
        List<RessourceDto> ressources = ressourceService.getAllRessources();
        return ResponseEntity.ok(ressources);
    }

    // Get all resources for a specific task (tache)
    @GetMapping("/tache/{tacheId}")
    public ResponseEntity<List<RessourceDto>> getRessourcesByTacheId(@PathVariable int tacheId) {
        List<RessourceDto> ressources = ressourceService.getRessourcesByTacheId(tacheId);
        return ResponseEntity.ok(ressources);
    }

    // Update a resource
    @PutMapping("/{id}")
    public ResponseEntity<RessourceDto> updateRessource(@PathVariable int id, @RequestBody RessourceDto ressourceDto) {
        RessourceDto updatedRessource = ressourceService.updateRessource(id, ressourceDto);
        return ResponseEntity.ok(updatedRessource);
    }

    // Delete a resource
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRessource(@PathVariable int id) {
        ressourceService.deleteRessource(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/pagination/all")
    public ResponseEntity<Page<RessourceDto>> getAllRessourcesWithPagination(Pageable pageable) {
        Page<RessourceDto> ress = ressourceService.getAllRessWithPagination(pageable);
        return ResponseEntity.ok(ress);
    }

    @GetMapping("/sort/asc")
    public ResponseEntity<Page<RessourceDto>> getRessourcesSortedByFieldAsc(@RequestParam String field, Pageable pageable) {
        Page<RessourceDto> sorted = ressourceService.getRessSortedByFieldAsc(field, pageable);
        return ResponseEntity.ok(sorted);
    }

    @GetMapping("/sort/desc")
    public ResponseEntity<Page<RessourceDto>> getRessourcesSortedByFieldDesc(@RequestParam String field, Pageable pageable) {
        Page<RessourceDto> ress = ressourceService.getRessSortedByFieldDesc(field, pageable);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(ress);
    }
}
