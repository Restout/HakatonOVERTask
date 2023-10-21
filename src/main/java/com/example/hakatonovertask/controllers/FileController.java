package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.FileIn;
import com.example.hakatonovertask.models.Files;
import com.example.hakatonovertask.service.FilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class FileController {
    FilesService filesService;
    @Autowired
    public void setFilesService(FilesService filesService) {
        this.filesService = filesService;
    }
    @PostMapping("/api/auth/files")
    public ResponseEntity<Files> saveFile(@ModelAttribute FileIn file,@RequestParam("materialId")Integer materialId){
        return ResponseEntity.ok().body(filesService.saveFile(file,materialId));
    }
    @PutMapping("/api/auth/files/{fileId}")
    public ResponseEntity<Files> updateFile(@PathVariable("fileId")Integer fileId, @RequestBody Files files){
        return ResponseEntity.ok().body(filesService.updateFile(fileId,files));
    }
    @DeleteMapping("/api/auth/files/{fileId}")
    public void deleteFile(@PathVariable("fileId")Integer fileId){
        filesService.deleteFile(fileId);
    }
}
