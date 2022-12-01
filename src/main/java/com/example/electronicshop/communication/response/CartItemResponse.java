package com.example.electronicshop.communication.response;

import com.example.electronicshop.models.enity.ProductElecImage;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemResponse {
    private String itemId;
    private String productid;
    private String name;
    private  List<ProductElecImage> image;
    private BigDecimal price;
    private long quantity;
    private long totalquanlityproduct;

    public CartItemResponse(String itemId, String name, List<ProductElecImage> image, BigDecimal price, long quantity) {
        this.itemId = itemId;
        this.name = name;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
    }

    public CartItemResponse(String itemId, String name, List<ProductElecImage> image, BigDecimal price, long quantity, long totalquanlityproduct) {
        this.itemId = itemId;
        this.name = name;
        this.image = image;
        this.price = price;
        this.quantity = quantity;
        this.totalquanlityproduct = totalquanlityproduct;
    }
}
