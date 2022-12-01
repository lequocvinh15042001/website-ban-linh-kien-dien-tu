package com.example.electronicshop.repository;


import com.example.electronicshop.models.enity.ProductElec;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductElecRepository extends MongoRepository<ProductElec, String> {
    Optional<ProductElec> findProductByIdAndState(String id, String state);
    Page<ProductElec> findAllByState(String state, Pageable pageable);
    Page<ProductElec> findAllByCategory_IdAndState(ObjectId catId, String state, Pageable pageable);
    @Query("{'name' : ?0 , 'state' : 'enable'}")
    Page<ProductElec>  findProductElecByCategory_NameAnState(String name, String state, Pageable pageable);
    @Query(value = " {'category' : ?0}" +  "    {'state' : 'enable'}")
    Page<ProductElec> findProductsByCategory(ObjectId id, Pageable pageable);
    Page<ProductElec> findAllBy(TextCriteria textCriteria, Pageable pageable);
    List<ProductElec> findAllByIdIsIn(List<String> productIds);

    List<ProductElec> findProductElecByCategory(ObjectId id);
}
