package com.example.hakatonovertask.controllers;

import com.example.hakatonovertask.models.FileIn;
import com.example.hakatonovertask.models.Files;
import com.example.hakatonovertask.repositories.FileRepository;
import com.example.hakatonovertask.service.FilesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class FileController {
    @Autowired
    FileRepository fileRepository;
    FilesService filesService;
    @Autowired
    public void setFilesService(FilesService filesService) {
        this.filesService = filesService;
    }
    @GetMapping("/api/auth/files/{fileId}")
    public ResponseEntity<ByteArrayResource> getFile(@PathVariable("fileId") Integer fileId){
        ByteArrayResource byteArrayResource = new ByteArrayResource(fileRepository.findById(fileId).orElse(null).getFile());
        return ResponseEntity.ok().body(byteArrayResource);
    }
    @PostMapping("/api/auth/files")
    public ResponseEntity<Files> saveFile(@ModelAttribute FileIn file,
                                          @RequestParam("materialId")Optional<Integer> materialId,
                                          @RequestParam("taskId")Optional<Integer> taskId){
        return ResponseEntity.ok().body(filesService.saveFile(file,materialId.orElse(null),taskId.orElse(null)));
    }
    @PutMapping("/api/auth/files/{fileId}")
    public ResponseEntity<Files> updateFile(@PathVariable("fileId")Integer fileId, @ModelAttribute FileIn files){
        return ResponseEntity.ok().body(filesService.updateFile(fileId,files));
    }
    @DeleteMapping("/api/auth/files/{fileId}")
    public void deleteFile(@PathVariable("fileId")Integer fileId,
                           @RequestParam("materialId") Optional<Integer> materialId,
                           @RequestParam("taskId")Optional<Integer> taskId){

        filesService.deleteFile(fileId,materialId.orElse(null),taskId.orElse(null));
    }
}
