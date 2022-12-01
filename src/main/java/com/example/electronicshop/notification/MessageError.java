package com.example.electronicshop.notification;

import lombok.Data;

@Data
public class MessageError {
    private int status;
    private Object message;
    private boolean success;
    public MessageError(int status, Object message) {
        this.status = status;
        this.message = message;
        this.success = false;
    }
}
