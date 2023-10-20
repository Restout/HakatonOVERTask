package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Files;
import com.example.hakatonovertask.repositories.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilesService {
    FileRepository fileRepository;
    @Autowired
    public void setFileRepository(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }
    public Files updateFile(Integer fileId, Files file){
        file.setFileId(fileId);
        return fileRepository.save(file);
    }
    public void deleteFile(Integer fileId){
        fileRepository.deleteById(fileId);
    }
}
