package com.example.electronicshop.controller;


import com.example.electronicshop.communication.request.LoginRequest;
import com.example.electronicshop.communication.request.Register;
import com.example.electronicshop.communication.request.VerifyCodeRequest;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login( @RequestBody LoginRequest loginReq) {
        return authService.login(loginReq);
    }

//    @PostMapping("/register")
//    public ResponseEntity<ResponseObject> register( @RequestBody Register registerReq) {
//        return authService.register(registerReq);
//    }

//    @PostMapping("/register/shipper")
//    public ResponseEntity<ResponseObject> registerShipper( @RequestBody Register registerReq) {
//        return authService.registerShipper(registerReq);
//    }
    @PostMapping("/verify")
    public ResponseEntity<?> verify(@Valid @RequestBody VerifyCodeRequest req) {
        return authService.verifyCode(req);
    }

    @PostMapping("/registermail")
    public ResponseEntity<?> registermail( @RequestBody Register registerReq) {
        return authService.registerWithMail(registerReq);
    }
    @PostMapping("/registermail/shipper")
    public ResponseEntity<ResponseObject> registerMailShipper( @RequestBody Register registerReq) {
        return authService.registerShipperWithMail(registerReq);
    }
    @PostMapping("/getotp")
    public ResponseEntity<?> getOTPMail(@RequestParam(value ="email")String email) {
        if (!email.isBlank()) return authService.sendMailGetOTP(email);
        throw new AppException(HttpStatus.BAD_REQUEST.value(), "Email is required");
    }
//    @PostMapping("/reset")
//    public ResponseEntity<?> reset(@RequestBody VerifyCodeRequest req) {
//        if (!req.getEmail().isBlank()) return authService.reset(req.getEmail());
//        throw new AppException(HttpStatus.BAD_REQUEST.value(), "Email is required");
//    }

}
