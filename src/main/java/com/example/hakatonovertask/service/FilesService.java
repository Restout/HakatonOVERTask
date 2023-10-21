package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.FileIn;
import com.example.hakatonovertask.models.Files;
import com.example.hakatonovertask.models.Material;
import com.example.hakatonovertask.repositories.ContainerRepository;
import com.example.hakatonovertask.repositories.FileRepository;
import com.example.hakatonovertask.repositories.MaterialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilesService {
    private MaterialsRepository materialsRepository;
    @Autowired
    public void setMaterialsRepository(MaterialsRepository materialsRepository) {
        this.materialsRepository = materialsRepository;
    }
    FileRepository fileRepository;
    @Autowired
    public void setFileRepository(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }
    public Files updateFile(Integer fileId, FileIn fileIn){
        Files files=null;
        try {
            files = new Files(fileId,fileIn.getFileName(),fileIn.getFile().getBytes());
        }catch (Exception e){
            e.printStackTrace();
        }


        return fileRepository.save(files);
    }
    public Files saveFile(FileIn file,Integer materialId){
        Material material = materialsRepository.findById(materialId).orElse(null);
        Files files = null;
        try {
            files = new Files(file.getFileName(),file.getFile().getBytes());
        }catch (Exception e){
            e.printStackTrace();
        }

        switch (file.getDirectory()){
            case "Practical":
                material.getPractical().add(files);
                break;
            case "Theoretical":
                material.getTheoretical().add(files);
                break;
            case "Independent":
                material.getIndependent().add(files);
        }
        materialsRepository.save(material);
        return files;
    }
    public void deleteFile(Integer fileId){
        fileRepository.deleteById(fileId);
    }
}
