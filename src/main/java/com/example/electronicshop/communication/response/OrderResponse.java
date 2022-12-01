package com.example.electronicshop.communication.response;

import com.example.electronicshop.models.ReceiveOrder;
import com.example.electronicshop.models.enity.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Data
@NoArgsConstructor
public class OrderResponse {
    private String id;
    private String userId;
    private String userName;
    private long totalProduct = 0;
    private BigDecimal totalPrice;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CartItemResponse> items = new ArrayList<>();
    private String state;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private ReceiveOrder receiveOrder;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    private LocalDateTime createdDate;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private User Shipper;

    public OrderResponse(String id, String userId, String userName, long totalProduct, BigDecimal totalPrice, String state) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.totalProduct = totalProduct;
        this.totalPrice = totalPrice;
        this.state = state;
    }

    public OrderResponse(String id, String userId, String userName, long totalProduct, BigDecimal totalPrice, String state, LocalDateTime createdDate) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.totalProduct = totalProduct;
        this.totalPrice = totalPrice;
        this.state = state;
        this.createdDate = createdDate;
    }

    public OrderResponse(String id, String userId, String userName, long totalProduct, BigDecimal totalPrice, String state, LocalDateTime createdDate, User shipper) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.totalProduct = totalProduct;
        this.totalPrice = totalPrice;
        this.state = state;
        this.createdDate = createdDate;
        Shipper = shipper;
    }

    public OrderResponse(String id, String userId, String userName, long totalProduct, BigDecimal totalPrice, String state, ReceiveOrder receiveOrder, LocalDateTime createdDate, User shipper) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.totalProduct = totalProduct;
        this.totalPrice = totalPrice;
        this.state = state;
        this.receiveOrder = receiveOrder;
        this.createdDate = createdDate;
        Shipper = shipper;
    }
}
