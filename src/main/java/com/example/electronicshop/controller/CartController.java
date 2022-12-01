package com.example.electronicshop.controller;

import com.example.electronicshop.communication.request.CartRequest;
import com.example.electronicshop.models.ReceiveOrder;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.security.jwt.JwtUtils;
import com.example.electronicshop.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CartController {
    private final CartService cartService;
    private final JwtUtils jwtUtils;
    @GetMapping(path = "/cart")
    public ResponseEntity<?> getProductFromCart (HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return cartService.getAllProductFromCart(user.getId());
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @PostMapping(path = "/cart")
    public ResponseEntity<?> addProductToCart (@RequestBody CartRequest req,
                                                  HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return cartService.addProductToCart(user.getId(), req);
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @PostMapping(path = "/cart/addshipping/{order_id}")
    public ResponseEntity<?> addShip (@PathVariable("order_id") String orderId,
                                      @RequestBody ReceiveOrder receiveOrder,
                                      HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return cartService.AddShiping( orderId,receiveOrder);
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @DeleteMapping(path = "/cart/remove/{orderItemId}")
    public ResponseEntity<?> deleteProductInCart (@PathVariable("orderItemId") String orderItemId,
                                                  HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return cartService.removeProductFromCart(user.getId(), orderItemId);
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }
}
