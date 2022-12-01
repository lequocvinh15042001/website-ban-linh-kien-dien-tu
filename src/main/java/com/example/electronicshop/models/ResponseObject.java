package com.example.electronicshop.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ResponseObject {
    private String isSuccess;
    private String message;
    private Object data;
}
