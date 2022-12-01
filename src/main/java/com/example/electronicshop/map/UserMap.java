package com.example.electronicshop.map;

import com.example.electronicshop.communication.request.Register;
import com.example.electronicshop.communication.response.LoginResponese;
import com.example.electronicshop.communication.response.UserResponse;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.models.provider.ESocial;
import org.springframework.stereotype.Service;

@Service
public class UserMap {
    public LoginResponese toLoginRes(User user) {
        LoginResponese loginRes = new LoginResponese();
        if (user != null) {
            loginRes.setId(user.getId());
            loginRes.setName(user.getName());
            loginRes.setAddress(user.getAddress());
            loginRes.setPhone(user.getPhone());
            loginRes.setEmail(user.getEmail());
            loginRes.setRole(user.getRole());
        }
        return loginRes;
    }
    public UserResponse thisUserRespone(User user) {
        UserResponse userRes = new UserResponse();
        if (user != null) {
            userRes.setId(user.getId());
            userRes.setName(user.getName());
            userRes.setEmail(user.getEmail());
            userRes.setRole(user.getRole());
            userRes.setState(user.getState());
            userRes.setPhone(user.getPhone());
            userRes.setAddress(user.getAddress());
        }
        return userRes;
    }
    public User toUser(Register req) {
        if (req != null) {

            return new User(req.getName(), req.getEmail(), req.getPassword(), req.getPhone(),
                    req.getAddress(), Constant.ROLE_USER, Constant.USER_ACTIVE, ESocial.LOCAL);
        }
        return null;
    }
    public User toUserMail(Register req) {
        if (req != null) {
            return new User(req.getName(), req.getEmail(), req.getPassword(), req.getPhone(),req.getAddress(),
                    Constant.ROLE_USER, Constant.USER_NOT_VERIFY, ESocial.LOCAL);
        }
        return null;
    }
    public User toUserShipper(Register req) {
        if (req != null) {

            return new User(req.getName(), req.getEmail(), req.getPassword(), req.getPhone(),
                    req.getAddress(), Constant.ROLE_SHIPPER, Constant.USER_ACTIVE, ESocial.LOCAL);
        }
        return null;
    }

    public User toUserShipperMail(Register req) {
        if (req != null) {

            return new User(req.getName(), req.getEmail(), req.getPassword(), req.getPhone(),
                    req.getAddress(), Constant.ROLE_SHIPPER, Constant.USER_NOT_VERIFY, ESocial.LOCAL);
        }
        return null;
    }

}
