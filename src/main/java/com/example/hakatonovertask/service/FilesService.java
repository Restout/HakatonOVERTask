package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.FileIn;
import com.example.hakatonovertask.models.Files;
import com.example.hakatonovertask.models.Material;
import com.example.hakatonovertask.models.Task;
import com.example.hakatonovertask.repositories.ContainerRepository;
import com.example.hakatonovertask.repositories.FileRepository;
import com.example.hakatonovertask.repositories.MaterialsRepository;
import com.example.hakatonovertask.repositories.TaskRepositpry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FilesService {
    private TaskRepositpry taskRepositpry;
    @Autowired
    public void setTaskRepositpry(TaskRepositpry taskRepositpry) {
        this.taskRepositpry = taskRepositpry;
    }

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
    public Files saveFile(FileIn file,Integer materialId,Integer taskId){
        Material material=null;
        Task task=null;
        if(materialId !=null){
           material = materialsRepository.findById(materialId).orElse(null);
        }
        if(taskId !=null){
            task = taskRepositpry.findById(taskId).orElse(null);
        }

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
            case "Task":
                task.getAnswers().add(files);

        }
        if(materialId !=null) {
            materialsRepository.save(material);
        }
        if(taskId !=null){
            taskRepositpry.save(task);
        }
        return files;
    }
    public void deleteFile(Integer fileId,Integer materialId,Integer taskId){
        Material material =null;
        if(materialId!=null) {
            material = materialsRepository.findById(materialId).orElse(null);
        }
        if(material!=null){
        if(material.getTheoretical()!=null) {
            for(int i =0;i<material.getTheoretical().size();i++){
                if(material.getTheoretical().get(i).getFileId()==fileId){
                    material.getTheoretical().remove(i);
                }
            }
        }
        if(material.getPractical()!=null) {
            for(int i =0;i<material.getPractical().size();i++){
                if(material.getPractical().get(i).getFileId()==fileId){
                    material.getPractical().remove(i);
                }
            }
        }
        if(material.getIndependent()!=null) {
            for(int i =0;i<material.getIndependent().size();i++){
                if(material.getIndependent().get(i).getFileId()==fileId){
                    material.getIndependent().remove(i);
                }
            }
        }
        }
        Task task =null;
        if(taskId!=null) {
            task = taskRepositpry.findById(taskId).orElse(null);
        }
        if(task!=null){
            if(task.getAnswers()!=null){
                for(int i =0;i<task.getAnswers().size();i++){
                    if(task.getAnswers().get(i).getFileId()==fileId){
                        task.getAnswers().remove(i);
                    }
                }
            }
        }
        fileRepository.deleteById(fileId);
    }
}
