package com.example.electronicshop.communication.request;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
@Data
@AllArgsConstructor
public class Register {

    private String name;
    @Size(max = 50)
    @Email
    private String email;
    @Size( min = 5, max = 50)
    private String password;
    private String phone;
    private String address;
    private String role;
}
