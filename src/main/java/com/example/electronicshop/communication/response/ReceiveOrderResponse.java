package com.example.electronicshop.communication.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReceiveOrderResponse {
    private String receiveName;
    private String receivePhone;
    private String receiveAddress;
    private String receiveProvince;
    private String receiveDistrict;
    private String receiveVillage;

}
