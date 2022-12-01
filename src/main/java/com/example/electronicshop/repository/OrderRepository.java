package com.example.electronicshop.repository;

import com.example.electronicshop.models.enity.Order;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.aggregation.BooleanOperators;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository  extends MongoRepository<Order, String> {
    Optional<Order> findOrderByUser_IdAndState(ObjectId userId, String state);
    Optional<Order> findByIdAndState(String id, String state);
    List<Order> findOrderByUser_Id(ObjectId userId);
    List<Order> findOrderByShipper (ObjectId shipperId);
    List<Order> findByShipper(ObjectId shipperId);
    Page<Order> findAllByState(String state, Pageable pageable);

    List<Order> findAllByState(String state);
    Page<Order> findAllByCreatedDateBetweenAndState(LocalDateTime from, LocalDateTime to, String state, Pageable pageable);
    List<Order> findAllByCreatedDateBetweenAndState(LocalDateTime from, LocalDateTime to, String state);

}
