package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Material;
import com.example.hakatonovertask.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MaterialsController {
    MaterialService materialService;

    @Autowired
    public void setMaterialService(MaterialService materialService) {
        this.materialService = materialService;
    }

    @GetMapping("/api/auth/material")
    public ResponseEntity<List<Material>> getMaterials(@RequestParam("userId") Integer userId, @RequestParam("lessonId") Integer lessonId) {
        return ResponseEntity.ok().body(materialService.getMaterials(lessonId, userId));

    }

    @PostMapping("/api/auth/material")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public ResponseEntity<Material> saveMaterial(
            @RequestParam("userId") Integer userId,
            @RequestParam("lessonId") Integer lessonId,
            @RequestBody Material material) {
        return ResponseEntity.ok().body(materialService.saveMaterial(lessonId, userId, material));

    }

    @PutMapping("/api/auth/material/{materialId}")
    public ResponseEntity<Material> updateMaterial(@RequestBody Material material, @PathVariable("materialId") Integer materialId) {
        return ResponseEntity.ok().body(materialService.updateMaterial(material, materialId));
    }
    @DeleteMapping("/api/auth/material/{materialId}")
    @PreAuthorize("hasAnyAuthority('ADMIN','TEACHER')")
    public void deleteMaterial( @PathVariable("materialId") Integer materialId){
        materialService.deleteMaterial(materialId);
    }
}
