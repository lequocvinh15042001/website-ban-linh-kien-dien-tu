package com.example.electronicshop.communication.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderSale {
    private String date;
    private BigDecimal amount;
    private int orderQuantity;
}
