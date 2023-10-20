package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.Material;
import com.example.hakatonovertask.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        try {
            return ResponseEntity.ok().body(materialService.getMaterials(lessonId, userId));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping("/api/auth/material")
    public ResponseEntity<Material> saveMaterial(
            @RequestParam("userId") Integer userId,
            @RequestParam("lessonId") Integer lessonId,
            @RequestBody Material material) {
        try {
            return ResponseEntity.ok().body(materialService.saveMaterial(lessonId, userId, material));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/api/auth/material/{materialId}")
    public ResponseEntity<Material> updateMaterial(@RequestBody Material material, @PathVariable("materialId") Integer materialId) {
        try {
            return ResponseEntity.ok().body(materialService.updateMaterial(material, materialId));
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
