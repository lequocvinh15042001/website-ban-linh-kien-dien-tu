package com.example.electronicshop.communication.response;

import lombok.Data;

@Data
public class UserResponse {
    private String id;
    private String email;
    private String name;
    private String phone;
    private String address;
    private String role;
    private String state;
}
