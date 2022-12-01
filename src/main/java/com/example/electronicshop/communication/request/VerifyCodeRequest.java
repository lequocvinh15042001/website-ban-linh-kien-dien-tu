package com.example.electronicshop.communication.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
public class VerifyCodeRequest {
    private String otp;
    @Email
    private String email;
    private String type;
}
