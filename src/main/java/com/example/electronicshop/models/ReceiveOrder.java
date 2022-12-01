package com.example.electronicshop.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReceiveOrder {
    private String receiveName;
    private String receivePhone;
    private String receiveAddress;
    private String receiveProvince;
    private String receiveDistrict;
    private String receiveVillage;
    private String paymentType;
}
