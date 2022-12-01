package com.example.electronicshop.models.enity;

import com.example.electronicshop.models.provider.ESocial;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "product_elec")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductElec{
    @Id
    private String id;
    private String name;
    private String description;
    private BigDecimal price;
    @DocumentReference
    private Category category;
    private int quantity;
    private int sold;
    private int rate = 0;
    private String state;
    //    @DocumentReference(lookup="{'product':?#{#self._id} }", lazy = true)
//    private List<ProductImage> images = new ArrayList<>();
//    private String url;
    @ReadOnlyProperty
    @DocumentReference(lookup="{'product':?#{#self._id} }", lazy = true)
    private List<Comment> comments;
    @CreatedDate
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdDate;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @LastModifiedDate
    private LocalDateTime updateDate;
    private List<ProductElecImage> images = new ArrayList<>();


//    public ProductElec(String name, String description, BigDecimal price, Category category, int quantity, int sold, double rate, String url, LocalDateTime createdDate, LocalDateTime lastModifiedDate, String state) {
//        this.name = name;
//        this.description = description;
//        this.price = price;
//        this.category = category;
//        this.quantity = quantity;
//        this.sold = sold;
//        this.rate = rate;
//       /* this.url = url;*/
//        this.createdDate = createdDate;
//        this.lastModifiedDate = lastModifiedDate;
//        this.state = state;
//    }
public ProductElec(String name, String description, BigDecimal price, Category category, int quantity, String state) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.quantity = quantity;
    this.state = state;
}

    public ProductElec(String name, String description, BigDecimal price, Category category, int quantity, String state, LocalDateTime createdDate, LocalDateTime updateDate) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
        this.state = state;
        this.createdDate = createdDate;
        this.updateDate = updateDate;
    }
    @Transient
    public int getRateCount() {
        try {
            return comments.size();
        } catch (Exception e) {
            return 0;
        }
    }
}
