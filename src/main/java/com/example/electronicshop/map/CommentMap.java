package com.example.electronicshop.map;

import com.example.electronicshop.communication.request.ProductElecRequest;
import com.example.electronicshop.communication.response.CommentResponse;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.models.enity.Category;
import com.example.electronicshop.models.enity.Comment;
import com.example.electronicshop.models.enity.ProductElec;
import com.example.electronicshop.repository.ProductElecRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentMap {

    public CommentResponse toCommentRes(Comment req) {
        return new CommentResponse(req.getId(), req.getContent(), req.getRate(),
                req.getState(), req.getUser().getName(), req.getCreatedDate());
    }
    public CommentResponse toAllCommentRes(Comment req){
        return new CommentResponse(req.getId(), req.getContent(), req.getRate(),
                req.getState(), req.getUser().getId(),req.getUser().getName(),req.getProduct().getId(),req.getProduct().getName() ,req.getCreatedDate());
    }
}
