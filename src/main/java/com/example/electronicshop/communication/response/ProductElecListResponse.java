package com.example.electronicshop.communication.response;

import com.example.electronicshop.models.enity.Category;
import com.example.electronicshop.models.enity.ProductElecImage;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductElecListResponse {
    private String id;
    private String name;
    private String description;
    private int rate;
    @DocumentReference
    private Category category;
    private int quantity;
    private int sold;
    private BigDecimal price;
    private List<ProductElecImage> images;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    LocalDateTime createdDate;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    LocalDateTime updateDate;
    private  String state;
}
