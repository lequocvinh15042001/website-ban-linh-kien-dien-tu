package com.example.electronicshop.controller;

import com.example.electronicshop.communication.request.CommentRequest;
import com.example.electronicshop.models.enity.Comment;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.security.jwt.JwtUtils;
import com.example.electronicshop.service.CommentService;
import lombok.AllArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CommentController {
    private final CommentService commentService;
    private final JwtUtils jwtUtils;

    @GetMapping(path = "/comment/{productId}")
    public ResponseEntity<?> findByProductId (@PathVariable("productId") String productId,
                                              @PageableDefault(size = 5, sort = "createdDate, DESC") @ParameterObject Pageable pageable){
        return commentService.findByProductId(productId, pageable);
    }

    @GetMapping(path = "/admin/manage/comment/findall")
    public ResponseEntity<?> findAllComment (){
        return commentService.findAllComment();
    }


    @PostMapping(path = "/comment")
    public ResponseEntity<?> addComment (@Valid @RequestBody CommentRequest req,
                                        HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return commentService.addComment(user.getId(), req);
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @PutMapping("/admin/manage/comment/setenable/{CommentId}")
    public ResponseEntity<?> setEnableComment (@PathVariable("CommentId") String CommentId)
    {
        return commentService.setEnableComment(CommentId);
    }
    @DeleteMapping("/admin/manage/comment/block/{CommentId}")
    public ResponseEntity<?> blockComment (@PathVariable("CommentId") String CommentId)
    {
        return commentService.blockComment(CommentId);
    }
    @DeleteMapping("/admin/manage/comment/delete/{CommentId}")
    public ResponseEntity<?> deleteComment (@PathVariable("CommentId") String CommentId)
    {
        return commentService.deleteCommemt(CommentId);
    }
}
