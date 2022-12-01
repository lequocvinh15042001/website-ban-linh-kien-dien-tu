package com.example.electronicshop.map;

import com.example.electronicshop.communication.response.OrderResponse;
import com.example.electronicshop.models.enity.Order;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class OrderMap {
    public OrderResponse toOrderRes (Order order) {
        return new OrderResponse(order.getId(), order.getUser().getId(), order.getUser().getName(),
                order.getTotalProduct(), order.getTotalPrice(), order.getState(),order.getCreatedDate());
    }

    public OrderResponse toOrderDetailRes (Order order) {
        OrderResponse orderRes =  new OrderResponse(order.getId(), order.getUser().getId(), order.getUser().getName(),
                order.getTotalProduct(), order.getTotalPrice(), order.getState(),order.getCreatedDate());
        orderRes.setItems(order.getProductElecList().stream().map(CartMap::toCartItemRes).collect(Collectors.toList()));
        orderRes.setReceiveOrder(order.getReceiveOrder());
        return orderRes;
    }
    public OrderResponse toOrderDetailResAll (Order order) {
        OrderResponse orderRes =  new OrderResponse(order.getId(), order.getUser().getId(), order.getUser().getName(),
                order.getTotalProduct(), order.getTotalPrice(), order.getState(),order.getCreatedDate());
        orderRes.setItems(order.getProductElecList().stream().map(CartMap::toCartItemAllRes).collect(Collectors.toList()));
        orderRes.setReceiveOrder(order.getReceiveOrder());
        return orderRes;
    }

    public OrderResponse toOrderShipperRes (Order order) {
        return new OrderResponse(order.getId(), order.getUser().getId(), order.getUser().getName(),
                order.getTotalProduct(), order.getTotalPrice(), order.getState(),order.getCreatedDate(),order.getShipper());
    }
    public OrderResponse toOrderDetailShipperRes (Order order) {
        OrderResponse orderRes =  new OrderResponse(order.getId(), order.getUser().getId(), order.getUser().getName(),
                order.getTotalProduct(), order.getTotalPrice(), order.getState(),order.getCreatedDate());
        orderRes.setItems(order.getProductElecList().stream().map(CartMap::toCartItemRes).collect(Collectors.toList()));
        orderRes.setReceiveOrder(order.getReceiveOrder());
        orderRes.setShipper(order.getShipper());
        return orderRes;
    }

}
