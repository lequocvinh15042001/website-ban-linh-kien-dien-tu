package com.example.electronicshop.communication.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReceiveOrderRequest {
    private String receiveName;
    private String receivePhone;
    private String receiveAddress;
    private String receiveProvince;
    private String receiveDistrict;
    private String receiveVillage;
}
