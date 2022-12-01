package com.example.electronicshop.communication.request;

import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotBlank;
@Data
@NoArgsConstructor
public class ChangePassword {
    public String newpass;
    public String oldpass;
}
