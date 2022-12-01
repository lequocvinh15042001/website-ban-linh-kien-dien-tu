package com.example.electronicshop.models.enity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.math.BigDecimal;

@Document(collection = "order_products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderProduct {
    @Id
    private String id;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private ProductElec productElec;
    private long quantity;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private Order order;
    @Transient
    private BigDecimal Price = BigDecimal.ZERO;
    public BigDecimal getPrice(){
        BigDecimal originPrice = productElec.getPrice().multiply(BigDecimal.valueOf(quantity));
        return originPrice;
    }

    public OrderProduct(ProductElec productElec, long quantity, Order order) {
        this.productElec = productElec;
        this.quantity = quantity;
        this.order = order;
    }
}
