package com.example.electronicshop.communication.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserRequest {
    private String name;
    private String phone;
    private String address;
    private String password;
}
