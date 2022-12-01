package com.example.electronicshop.map;

import com.example.electronicshop.communication.response.CartItemResponse;
import com.example.electronicshop.communication.response.CartResponse;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.models.enity.Category;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.models.enity.OrderProduct;
import com.example.electronicshop.models.enity.ProductElec;
import com.example.electronicshop.repository.ProductElecRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class CartMap {
  public CartResponse toCartRes (Order order) {
        CartResponse res = new CartResponse(order.getId(), order.getTotalProduct(), order.getTotalPrice(), order.getState());
        res.setItems(order.getProductElecList().stream().map(CartMap::toCartItemRes).collect(Collectors.toList()));
        return res;
    }
    public CartResponse toCartResAll (Order order) {
        CartResponse res = new CartResponse(order.getId(), order.getTotalProduct(), order.getTotalPrice(), order.getState());
        res.setItems(order.getProductElecList().stream().map(CartMap::toCartItemAllRes).collect(Collectors.toList()));
        return res;
    }

    public static CartItemResponse toCartItemRes(OrderProduct orderProduct) {
        return new CartItemResponse(orderProduct.getId(), orderProduct.getProductElec().getName(),
                orderProduct.getProductElec().getImages(),
                orderProduct.getPrice(),
                orderProduct.getQuantity());
    }

    public static CartItemResponse toCartItemAllRes(OrderProduct orderProduct) {
        return new CartItemResponse(orderProduct.getId(),orderProduct.getProductElec().getId(), orderProduct.getProductElec().getName(),
                orderProduct.getProductElec().getImages(),
                orderProduct.getPrice(),
                orderProduct.getQuantity(),
               orderProduct.getProductElec().getQuantity());
    }
}
