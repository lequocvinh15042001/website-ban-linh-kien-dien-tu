package com.example.electronicshop.communication.response;

import com.example.electronicshop.models.enity.Category;
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
public class ProductElecResponse {
    private String id;
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String category_id;
    private int quantity;
    private int sold;
    private double rate ;
    private List<ProductElecImage> images;

    //    private String photo;
    @CreatedDate
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    LocalDateTime createdDate;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @LastModifiedDate
    LocalDateTime updateDate;
    private String state;
}
