package com.example.electronicshop.communication.request;

import com.example.electronicshop.models.enity.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ShipperRequest {
private User user;
}
