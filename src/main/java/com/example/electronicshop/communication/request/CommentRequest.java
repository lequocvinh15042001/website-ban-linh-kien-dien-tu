package com.example.electronicshop.communication.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.Range;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
public class CommentRequest {
    private String content;
    private String productId;
    @Range(min = 1, max = 5)
    private int rate;

}
