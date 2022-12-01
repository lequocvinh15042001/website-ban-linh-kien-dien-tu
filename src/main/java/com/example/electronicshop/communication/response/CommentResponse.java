package com.example.electronicshop.communication.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
public class CommentResponse {
    private String id;
    private String content;
    private double rate;
    private String state;
    private String userid;
    private String reviewedBy;
    private String productid;
    private String productname;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdDate;

    public CommentResponse(String id, String content, double rate, String state, String reviewedBy, LocalDateTime createdDate) {
        this.id = id;
        this.content = content;
        this.rate = rate;
        this.state = state;
        this.reviewedBy = reviewedBy;
        this.createdDate = createdDate;
    }


}
