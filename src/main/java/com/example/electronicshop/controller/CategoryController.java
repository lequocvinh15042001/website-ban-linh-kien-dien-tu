package com.example.electronicshop.controller;

import com.example.electronicshop.communication.request.CategoryRequest;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CategoryController {
    private final CategoryService categoryService;
    @GetMapping(path = "/categories/{id}")
    public ResponseEntity<ResponseObject> findCategoryById (@PathVariable("id") String id){
        return categoryService.findCategoryById(id);
    }
    @GetMapping(path = "/admin/manage/categories") //cho admin
    public ResponseEntity<ResponseObject> findAll (){
        return categoryService.findAll();
    }
    @GetMapping(path = "/categories") // cho user
    public ResponseEntity<ResponseObject> findAllCategory (){
    return categoryService.findAllCategory();
    }
    @PostMapping(path = "/admin/manage/categories")
    public ResponseEntity<ResponseObject> addCategory (@RequestBody CategoryRequest req){
        return categoryService.createCategory(req);
    }

    @PutMapping(path = "/admin/manage/categories/{id}")
    public ResponseEntity<ResponseObject> updateCategory (@PathVariable("id") String id,
                                             @RequestBody CategoryRequest req){
        return categoryService.updateCategory(id, req);
    }



    @DeleteMapping(path = "/admin/manage/categories/deactive/{id}")
    public ResponseEntity<ResponseObject> deleteCategory (@PathVariable("id") String id){
        return categoryService.deleteCategory(id);
    }



}
