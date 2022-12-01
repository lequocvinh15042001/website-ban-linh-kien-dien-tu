package com.example.electronicshop.service;

import com.example.electronicshop.communication.request.ProductElecRequest;
import com.example.electronicshop.communication.response.ProductElecListResponse;
import com.example.electronicshop.communication.response.ProductElecResponse;
import com.example.electronicshop.config.CloudinaryConfig;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.ProductElecMap;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Category;
import com.example.electronicshop.models.enity.ProductElec;
import com.example.electronicshop.models.enity.ProductElecImage;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.CategoryRepository;
import com.example.electronicshop.repository.ProductElecRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.mongodb.MongoWriteException;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
@Slf4j
public class ProductElecService {
    private final ProductElecRepository productElecRepository;
    private final CategoryRepository categoryRepository;
    private final ProductElecMap productElecMap;
    private final CloudinaryConfig cloudinary;

    public ResponseEntity<?> findProductByCategoryId(String id, Pageable pageable) {
        Page<ProductElec> products;
        try {
            Optional<Category> category = categoryRepository.findCategoryByIdAndState(id, Constant.ENABLE);
            if (category.isPresent()) {
                products = productElecRepository.findProductsByCategory(new ObjectId(id), pageable);
            }
            else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("false", "Request is null", ""));
            }
        } catch (Exception e) {
            throw new AppException(HttpStatus.BAD_REQUEST.value(), "Error when finding");
        }
        List<ProductElecListResponse> resList = products.stream().map(productElecMap::toProductListRes).collect(Collectors.toList());
        ResponseEntity<?> resp = addPageableToRes(products, resList);
        if (resp != null) return resp;
        throw new NotFoundException("Can not found any product with category or brand id: "+id);
    }

    public ResponseEntity<?> findProductElecByCategoryId(String id) {
        List<ProductElec> products;
        try {
            Optional<Category> category = categoryRepository.findCategoryByIdAndState(id, Constant.ENABLE);
            if (category.isPresent()) {
                products = productElecRepository.findProductElecByCategory(new ObjectId(id));
            }
            else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        new ResponseObject("false", "Request is null", ""));
            }
        } catch (Exception e) {
            throw new AppException(HttpStatus.BAD_REQUEST.value(), "Error when finding");
        }
        List<ProductElecListResponse> resList = products.stream().map(productElecMap::toProductListRes).collect(Collectors.toList());

        if (resList != null)   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("true", "GetProduct", resList));
    ;
        throw new NotFoundException("Can not found any product with category or brand id: "+id);
    }
    public ResponseEntity<?> addProduct(ProductElecRequest req) {
        List<ProductElecImage> images = new ArrayList<>();
        if (req != null) {
            ProductElec product = productElecMap.toProduct(req);
            try {
                processUploadImage(req.getImages(), product);
                productElecRepository.save(product);
            } catch (Exception e) {
                throw new AppException(HttpStatus.CONFLICT.value(), "Product name already exists");
            }
            ProductElecResponse res = productElecMap.toProductRes(product);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("true", "Add product successfully ", res)
            );
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ResponseObject("false", "Request is null", "")
        );
    }
    public ResponseEntity<?> updateProductImage(String id, List<MultipartFile> file) {
        Optional<ProductElec> productElec = productElecRepository.findById(id);
        if (productElec.isPresent()) {


            if (file == null || file.isEmpty())
                throw new AppException(HttpStatus.BAD_REQUEST.value(), "images is empty");
            for (int i = 0; i < file.size(); i++) {
                try {
                    String url = cloudinary.uploadImage(file.get(i), null);
                    if (i == 0)
                        productElec.get().getImages().add(new ProductElecImage(UUID.randomUUID().toString(), url));
                    else productElec.get().getImages().add(new ProductElecImage(UUID.randomUUID().toString(), url));
                } catch (IOException e) {
                    log.error(e.getMessage());
                    throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Error when upload images");
                }
                productElecRepository.save(productElec.get());
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("true", "Add product successfully ", productElec.get().getImages()));
        }
        else
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("false", "Cant get product ", ""));
    }

    public ResponseEntity<ResponseObject> unblockProduct(String id) {
        Optional<ProductElec> product = productElecRepository.findById(id);
        if (product.isPresent()) {
            product.get().setState(Constant.ENABLE);
            productElecRepository.save(product.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Delete product successfully ", product)
            );
        } throw new NotFoundException("Can not found product with id: "+id);
    }
    @Transactional
    public ResponseEntity<?> updateProduct(String id, ProductElecRequest req) {
        Optional<ProductElec> product = productElecRepository.findById(id);
        if (product.isPresent() && req != null) {
            processUpdate(req, product.get());
            try {
                productElecRepository.save(product.get());
            } catch (MongoWriteException e) {
                throw new AppException(HttpStatus.CONFLICT.value(), "Product name already exists");
            } catch (Exception e) {
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), e.getMessage());
            }
            ProductElecResponse res = productElecMap.toProductRes(product.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Update product successfully ", res)
            );
        }
        throw new NotFoundException("Can not found product with id: "+id);
    }

    public void processUpdate(ProductElecRequest req, ProductElec product) {
            product.setName(req.getName());
            product.setDescription(req.getDescription());
            product.setPrice(req.getPrice());
            product.setQuantity(req.getQuantity());
        if (!req.getCategory().equals(product.getCategory().getId())) {
            Optional<Category> category = categoryRepository.findCategoryByIdAndState(req.getCategory(), Constant.ENABLE);
            if (category.isPresent())
                product.setCategory(category.get());
            else throw new NotFoundException("Can not found category with id: "+req.getCategory());
        }

        if (req.getState() != null && !req.getState().isEmpty() &&
                (req.getState().equalsIgnoreCase(Constant.ENABLE) ||
                        req.getState().equalsIgnoreCase(Constant.DISABLE)))
            product.setState(req.getState());
        else throw new AppException(HttpStatus.BAD_REQUEST.value(), "Invalid state");
    }
    public List<ProductElecImage> processUploadImage (List<MultipartFile> images, ProductElec product) {
        if (images == null || images.isEmpty()) throw new AppException(HttpStatus.BAD_REQUEST.value(), "images is empty");
        for (int i = 0; i < images.size(); i++) {
            try {
                String url = cloudinary.uploadImage(images.get(i), null);
                if (i == 0) product.getImages().add(new ProductElecImage(UUID.randomUUID().toString(), url));
                else product.getImages().add(new ProductElecImage(UUID.randomUUID().toString(), url));
            } catch (IOException e) {
                log.error(e.getMessage());
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Error when upload images");
            }
            productElecRepository.save(product);
        }
        return product.getImages();
    }

    public ResponseEntity<?> findAll(Pageable pageable) {
        Page<ProductElec> products;
        products = productElecRepository.findAllByState(Constant.ENABLE, pageable);
        List<ProductElecListResponse> resList = products.getContent().stream().map(productElecMap::toProductListRes).collect(Collectors.toList());
        ResponseEntity<?> resp = addPageableToRes(products, resList);
        if (resp != null) return resp;
        throw new NotFoundException("Can not found any product");
    }

    public ResponseEntity<?> findAllProductAdmin() {
        List<ProductElec> products = productElecRepository.findAll();
        if (products.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get all user",products));
        throw new NotFoundException("Can not found any user");
    }

    public ResponseEntity<?> findAllAdminProductPage(Pageable pageable) {
        Page<ProductElec> products;
        products = productElecRepository.findAll(pageable);
        List<ProductElecListResponse> resList = products.getContent().stream().map(productElecMap::toProductListRes).collect(Collectors.toList());
        ResponseEntity<?> resp = addPageableToRes(products, resList);
        if (resp != null) return resp;
        throw new NotFoundException("Can not found any product");
    }
    private ResponseEntity<?> addPageableToRes(Page<ProductElec> products, List<ProductElecListResponse> resList) {
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        resp.put("totalQuantity", products.getTotalElements());
        resp.put("totalPage", products.getTotalPages());
        if (resList.size() >0 )
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get all product success", resp));
        return null;
    }
    public ResponseEntity<?> findProductById(String id) {
        Optional<ProductElec> product = productElecRepository.findProductByIdAndState(id, Constant.ENABLE);
        if (product.isPresent()) {
            ProductElecResponse res = productElecMap.toProductRes(product.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get product success", res));
        }
        throw new NotFoundException("Can not found any product with id: "+id);
    }
 public ResponseEntity<?>findProductDisableByAdmin(Pageable pageable){
        Page<ProductElec> products;
        products = productElecRepository.findAllByState(Constant.DISABLE, pageable);
        List<ProductElecListResponse> resList = products.getContent().stream().map(productElecMap::toProductListRes).collect(Collectors.toList());
     ResponseEntity<?> resp = addPageableToRes(products, resList);
     if (resp != null) return resp;
     throw new NotFoundException("Can not found any product");
    }
    public ResponseEntity<ResponseObject> deactivatedProduct(String id) {
        Optional<ProductElec> product = productElecRepository.findProductByIdAndState(id, Constant.ENABLE);
        if (product.isPresent()) {
            product.get().setState(Constant.DISABLE);
            productElecRepository.save(product.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Delete product successfully ", "")
            );
        } throw new NotFoundException("Can not found product with id: "+id);
    }
    @Transactional
    public ResponseEntity<ResponseObject> destroyProduct(String id) {
        Optional<ProductElec> productElec = productElecRepository.findById(id);
        if (productElec.isPresent()) {
            try {
                productElecRepository.deleteById(productElec.get().getId());

            } catch (Exception e) {
                log.error(e.getMessage());
                throw new NotFoundException("Error when destroy product with id: "+id);
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Destroy product successfully ", "")
            );
        } throw new NotFoundException("Can not found product with id: "+id);
    }

    @Transactional
    public ResponseEntity<?> deleteImageFromProduct(String id, String imageId) {
        Optional<ProductElec> product = productElecRepository.findById(id);
        if (product.isPresent() && !product.get().getImages().isEmpty()) {
            try {
                Optional<ProductElecImage> checkDelete = product.get().getImages().stream().filter(i -> i.getImageId().equals(imageId)).findFirst();
                if (checkDelete.isPresent()) {
                    cloudinary.deleteImage(checkDelete.get().getUrl());
                    product.get().getImages().remove(checkDelete.get());
                    productElecRepository.save(product.get());
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("true", "Delete image successfully", imageId)
                    );
                } else throw new NotFoundException("Can not found image in product with id: " + imageId);
            } catch (Exception e) {
                log.error(e.getMessage());
                throw new NotFoundException("Can not found product with id: " + id);
            }
        } throw new NotFoundException("Can not found any image or product with id: " + id);
    }

    @Transactional
    public ResponseEntity<?> addImagesToProduct(String id, List<MultipartFile> files) {
        Optional<ProductElec> product = productElecRepository.findById(id);
        if (product.isPresent()) {
            try {
                if (files == null || files.isEmpty() ) throw new AppException(HttpStatus.BAD_REQUEST.value(), "Images is require");
                files.forEach(f -> {
                    try {
                        String url = cloudinary.uploadImage(f, null);
                        product.get().getImages().add(new ProductElecImage(UUID.randomUUID().toString(), url));
                    } catch (IOException e) {
                        log.error(e.getMessage());
                        throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Error when upload images");
                    }
                    productElecRepository.save(product.get());
                });
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Add image to product successfully", product.get().getImages())
                );
            } catch (Exception e) {
                log.error(e.getMessage());
                throw new NotFoundException("Error when save image: " + e.getMessage());
            }
        } throw new NotFoundException("Can not found product with id: " + id);
    }
}
