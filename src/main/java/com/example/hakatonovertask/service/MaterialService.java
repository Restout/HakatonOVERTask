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
        List<Material> materials = new ArrayList<Material>();
        List<Container> containers = new ArrayList<Container>();
        containers= containerRepository.getContainersByLessonTeacher(containerRepository.getContainerByLessonIdAndStudentId(lessonId,userId).getLessonTeacher());
        for (var container:containers) {
            materials.add(new Material(
                    material.getMaterialId(),
                    container,
                    material.getDateStart(),
                    material.getDateEnd(),
                    material.getDescription(),
                    material.getTitle(),
                    material.getPractical(),
                    material.getTheoretical(),
                    material.getIndependent(),
                    material.getTasks()
            ));
        }
        for(var oneMaterial:materials){
            materialsRepository.save(oneMaterial);
        }
        return materialsRepository.save(materials.get(0));
    }
    public Material updateMaterial(Material material,Integer materialId){
        Material dbMaterial = materialsRepository.findById(materialId).orElse(null);
        List<Material> materials = new ArrayList<Material>();
        List<Container> containers = new ArrayList<Container>();
        containers= containerRepository.getContainersByLessonTeacher(materialsRepository.findById(materialId).orElse(null).getContainer().getLessonTeacher());

        for (var container:containers) {
            materials.add(materialsRepository.getMaterialByContainer(container));
            materials.add(new Material(
                    material.getMaterialId(),
                    container,
                    material.getDateStart(),
                    material.getDateEnd(),
                    material.getDescription(),
                    material.getTitle(),
                    material.getPractical(),
                    material.getTheoretical(),
                    material.getIndependent(),
                    material.getTasks()
            ));
        }


        material.setMaterialId(materialId);
        material.setContainer(materialsRepository.findById(materialId).orElse(null).getContainer());
        return materialsRepository.save(material);
    }
    public void deleteMaterial(Integer materilaId){
        materialsRepository.deleteById(materilaId);
    }
}
