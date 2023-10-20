package com.example.hakatonovertask.service;

import com.example.hakatonovertask.models.Container;
import com.example.hakatonovertask.models.Files;
import com.example.hakatonovertask.models.Material;
import com.example.hakatonovertask.models.Task;
import com.example.hakatonovertask.repositories.ContainerRepository;
import com.example.hakatonovertask.repositories.MaterialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MaterialService {
    private MaterialsRepository materialsRepository;
    private ContainerRepository containerRepository;
    @Autowired
    public void setMaterialsRepository(MaterialsRepository materialsRepository) {
        this.materialsRepository = materialsRepository;
    }
    @Autowired
    public void setContainerRepository(ContainerRepository containerRepository) {
        this.containerRepository = containerRepository;
    }

    public List<Material> getMaterials(Integer lessonId, Integer userId){
        return materialsRepository.getMaterialsByContainerLessonIdAndContainerStudentId(lessonId,userId);
    }
    public Material saveMaterial(Integer lessonId,Integer userId,Material material){
        material.setMaterialId(null);
        if(material.getTheoretical()!=null) {
            for (var file : material.getTheoretical()) {
                file.setFileId(null);
            }
        }
        if(material.getPractical()!=null) {
            for (var file : material.getPractical()) {
                file.setFileId(null);
            }
        }
        if(material.getIndependent()!=null) {
            for (var file : material.getIndependent()) {
                file.setFileId(null);
            }
        }
        if(material.getTasks()!=null) {
            for (var task : material.getTasks()) {
                task.setTaskId(null);
            }
        }
        material.setContainer(containerRepository.getContainerByLessonIdAndStudentId(lessonId,userId));
        return materialsRepository.save(material);
    }
    public Material updateMaterial(Material material,Integer materialId){
        Material dbMaterial = materialsRepository.findById(materialId).orElse(null);
        List<Files> theoreticals = dbMaterial.getTheoretical();
        if(material.getTheoretical()!=null) {
            for (var file : material.getTheoretical()) {
                file.setFileId(null);
                theoreticals.add(file);
            }
        }
        material.setTheoretical(theoreticals);

        List<Files> practical = dbMaterial.getPractical();
        if(material.getPractical()!=null) {
            for (var file : material.getPractical()) {
                file.setFileId(null);
                practical.add(file);
            }
        }
        material.setPractical(practical);

        List<Files> independent = dbMaterial.getIndependent();
        if(material.getIndependent()!=null) {
            for (var file : material.getIndependent()) {
                file.setFileId(null);
                independent.add(file);
            }
        }
        material.setIndependent(independent);

        List<Task> tasks = dbMaterial.getTasks();
        if(material.getTasks()!=null) {
            for (var task : material.getTasks()) {
                task.setTaskId(null);
                tasks.add(task);
            }
        }
        material.setTasks(tasks);

        material.setMaterialId(materialId);
        material.setContainer(materialsRepository.findById(materialId).orElse(null).getContainer());
        return materialsRepository.save(material);
    }
    public void deleteMaterial(Integer materilaId){
        materialsRepository.deleteById(materilaId);
    }
}
