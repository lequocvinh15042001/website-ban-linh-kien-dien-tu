package com.example.electronicshop.models.enity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.time.LocalDateTime;

@Document(collection = "comments")
@Data
@NoArgsConstructor
public class Comment {
    @Id
    private String id;
    private String content;

    private double rate;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private ProductElec product;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private User user;
    private String state;
    @CreatedDate
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    LocalDateTime createdDate;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    @LastModifiedDate
    LocalDateTime lastModifiedDate;


    public Comment(String content, double rate, ProductElec product, User user, String state, LocalDateTime createdDate) {
        this.content = content;
        this.rate = rate;
        this.product = product;
        this.user = user;
        this.state = state;
        this.createdDate = createdDate;
    }
}
