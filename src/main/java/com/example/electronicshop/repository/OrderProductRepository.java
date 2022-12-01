package com.example.electronicshop.repository;


import com.example.electronicshop.models.enity.OrderProduct;
import com.example.electronicshop.models.enity.ProductElec;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderProductRepository extends MongoRepository<OrderProduct, String> {
    Optional<OrderProduct> findOrderProductByProductElec_IdAndOrder_Id(ObjectId id, ObjectId orderId);
}
