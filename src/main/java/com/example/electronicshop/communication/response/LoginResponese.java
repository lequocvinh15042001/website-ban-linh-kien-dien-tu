package com.example.electronicshop.communication.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponese {
    private String id;
    private String email;
    private String name;
    private String address;
    private String phone;
    private String role;
    private String accessToken;
}
