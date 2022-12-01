package com.example.electronicshop.config;

public class Constant {
    public static final String ENABLE = "enable";
    public static final String DISABLE = "disable";
    //ROLE
    public static final String ROLE_ADMIN = "role_admin";
    public static final String ROLE_USER = "role_user";

    public static final String ROLE_SHIPPER = "role_shipper";

    //USER STATE
    public static final String USER_ACTIVE = "active";
    public static final String USER_NOT_ACTIVE = "block";
    public static final String USER_NOT_VERIFY = "not_verify";
    //COMMENT STATE
    public static final String COMMENT_ENABLE = "enable";
    public static final String COMMENT_BLOCK = "block";

    public static final String COMMENT_PROCESS = "process"; //comment chờ duyệt
    //
    public static final String CART_ENABLE= "watting";
    //ORDER STATE
    public static final String ORDER_INCART="in cart"; // con trong cart chưa vao order (an khoi orer)
    public static final String ORDER_CANCEL = "cancel";// huy
    public static final String ORDER_PROCESS = "process"; // sau khi nhap dia chi cho duyet
    public static final String ORDER_PAID = "paid"; // da thanh toan tien mat
    public static final String ORDER_DELIVERY = "delivery";// dang giao hoan
    public static final String ORDER_PENDING = "pending";
}
