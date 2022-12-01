package com.example.electronicshop.controller;

import com.example.electronicshop.communication.request.ImageRequest;
import com.example.electronicshop.communication.request.ProductElecRequest;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.service.ProductElecService;
import lombok.AllArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ProductElecController {
    private final ProductElecService productElecService;
    @PostMapping("/admin/manage/productelec/add")
    public ResponseEntity<?> addProduct( @ModelAttribute ProductElecRequest req) {
        return productElecService.addProduct(req);
    }
    @PutMapping("/admin/manage/productelec/update/{productId}")
    public ResponseEntity<?> updateProduct (@PathVariable("productId") String productId, @RequestBody ProductElecRequest req){
        return productElecService.updateProduct(productId,req);
    }

    @PutMapping("/admin/manage/productelec/updateimage/{productId}")
    public ResponseEntity<?> updateImageProduct (@PathVariable("productId") String productId, @RequestParam /*(value = "images")*/ List<MultipartFile> file){
        return productElecService.updateProductImage(productId,file);
    }

    @PutMapping("/admin/manage/productelec/unblock/{productId}")
    public ResponseEntity<?> unblockProduct (@PathVariable("productId") String productId){
        return productElecService.unblockProduct(productId);
    }


    @GetMapping(path = "/productelec/category/{id}")
    public ResponseEntity<?> findByCategoryIdAndBrandId (@PathVariable("id") String id,
                                                         @ParameterObject Pageable pageable){
        return productElecService.findProductByCategoryId(id, pageable);
    }
    @GetMapping(path = "/productelec/getcategory/{id}")
    public ResponseEntity<?> findByCategoryId (@PathVariable("id") String id){
        return productElecService.findProductElecByCategoryId(id);
    }
    @GetMapping(path = "/productelec/all")
    public ResponseEntity<?> findAll (@PageableDefault(size = 10) @ParameterObject Pageable pageable){
        return productElecService.findAll(pageable);
    }

    @GetMapping(path = "/admin/manage/productelec/productelec/all")
    public ResponseEntity<?> findAllAdminPage (@PageableDefault(size = 10) @ParameterObject Pageable pageable){
        return productElecService.findAllAdminProductPage(pageable);
    }
    @GetMapping(path = "/admin/manage/productelec/productelec/get/all")
    public ResponseEntity<?> findAllAdmin (){
        return productElecService.findAllProductAdmin();
    }

    @GetMapping(path = "/productelec/{productId}")
    public ResponseEntity<?> findProductById (@PathVariable("productId") String productId){
        return productElecService.findProductById(productId);
    }
    @DeleteMapping("/admin/manage/productelec/deactive/{productId}")
    public ResponseEntity<ResponseObject> deactiveProduct(@PathVariable("productId") String productId) {
        return productElecService.deactivatedProduct(productId);
    }
    @DeleteMapping("/admin/manage/productelec/delete/{productId}")
    public ResponseEntity<ResponseObject> deleteProduct(@PathVariable("productId") String productId) {
        return productElecService.destroyProduct(productId);
    }
    @PostMapping(value = "/admin/manage/productelec/uploadimages/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addImages(@PathVariable("productId") String productId ,
                                       @ModelAttribute ImageRequest req) {
        return productElecService.addImagesToProduct(productId, req.getFiles());
    }

    @DeleteMapping("/admin/manage/productelec/deleteimages/{productId}")
    public ResponseEntity<?> deleteImageProduct(@PathVariable("productId") String productId, @RequestBody ImageRequest req) {
        return productElecService.deleteImageFromProduct(productId, req.getImageId());
    }

}
