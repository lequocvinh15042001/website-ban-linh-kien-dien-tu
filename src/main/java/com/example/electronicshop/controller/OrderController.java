package com.example.electronicshop.controller;

import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.security.jwt.JwtUtils;
import com.example.electronicshop.service.OrderService;
import lombok.AllArgsConstructor;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class OrderController {
    private final JwtUtils jwtUtils;
    private final OrderService orderService;

    @GetMapping(path = "/admin/manage/orders")
    public ResponseEntity<?> findAllState (@RequestParam(defaultValue = "")String state,
                                      @PageableDefault(size = 5) @ParameterObject Pageable pageable){
        return orderService.findAllState(state, pageable);
    }

    @GetMapping(path = "/admin/manage/getpage/orders")
    public ResponseEntity<?> findAllOrderPage(@PageableDefault(size = 5) @ParameterObject Pageable pageable){
        return orderService.findAllOrderPage(pageable);
    }
    @GetMapping(path = "/admin/manage/get/orders")
    public ResponseEntity<?> findAllOrder (){
        return orderService.findAllOrder();
    }

    @GetMapping(path = "/shipper/manage/get/orders") //tim tat ca don hang process boi shipper
    public ResponseEntity<?> findAllOrderShipperProcess (@ParameterObject  @PageableDefault(size = 5) Pageable pageable){

        return orderService.findAllOrderStateProcess(pageable);
    }

    @GetMapping(path = "/admin/manage/orders/getprocess") //tim tat ca don hang process
    public ResponseEntity<?> findAllOrderProcessAdmin (@ParameterObject  @PageableDefault(size = 5) Pageable pageable){

        return orderService.findAllOrderStateProcess(pageable);
    }
    @GetMapping(path = "/admin/manage/orders/getpaid")
    public ResponseEntity<?> findAllOrderPaidAdmin (@ParameterObject  @PageableDefault(size = 5) Pageable pageable){

        return orderService.findAllOrderStatePaid(pageable);
    }
    @GetMapping(path = "/admin/manage/orders/getdelivery")
    public ResponseEntity<?> findAllOrderDeliveryAdmin (@ParameterObject  @PageableDefault(size = 5) Pageable pageable){

        return orderService.findAllOrderStateDeliver(pageable);
    }
    @GetMapping(path = "/admin/manage/orders/getcancel")
    public ResponseEntity<?> findAllOrderCancelAdmin (@ParameterObject  @PageableDefault(size = 5) Pageable pageable){

        return orderService.findAllOrderStateCancel(pageable);
    }



    @GetMapping(path = "/shipper/manage/getall/orders") //tim tat ca don hang da duoc chon boi shipper
    public ResponseEntity<?> getAllOrderbyShippers (  HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank()) {
            return orderService.findAllOrderByShipperId(user.getId());
        }
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @GetMapping(path = "/admin/manage/orders/{orderId}")
    public ResponseEntity<?> findOrderById (@PathVariable String orderId){
        return orderService.findOrderById(orderId);
    }

    @GetMapping(path = "/admin/manage/orders/stats")
    public ResponseEntity<?> getStats (@RequestParam(value = "from", defaultValue = "") String from,
                                       @RequestParam(value = "to",defaultValue = "" ) String to,
                                       @RequestParam("type") String type){
        return orderService.getOrderStatistical(from, to, type);
    }

    @GetMapping(path = "/orders/{orderId}") // tim chi tiet mot order theo id cua nguoi dung
    public ResponseEntity<?> userFindOrderById (@PathVariable String orderId,
                                                HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return orderService.findOrderByUserId(orderId, user.getId());
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @GetMapping(path = "/shipper/orders/{orderId}") // tim chi tiet mot order theo id cua shipper
    public ResponseEntity<?> shipperFindOrderById (@PathVariable String orderId,
                                                HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return orderService.findOrderByShipperId(orderId, user.getId());
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }


    @GetMapping(path = "/orders/getallorder")
    public ResponseEntity<?> userFindAllOrderById (HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        if (!user.getId().isBlank())
            return orderService.findAllOrderByUserId(user.getId());
        throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission! Token is invalid");
    }

    @PostMapping(path = "shipper/orders/pick/{orderId}") // chon cac don hang process de giao
    public ResponseEntity<?> chooseOrderProcess (@PathVariable String orderId,
                                          HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        return orderService.chooseOrderByShipper(orderId, user);
    }

    @PutMapping(path = "/orders/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder (@PathVariable String orderId,
                                          HttpServletRequest request){
        User user = jwtUtils.getUserFromJWT(jwtUtils.getJwtFromHeader(request));
        return orderService.cancelOrder(orderId, user.getId());
    }

    @PutMapping(path = "/admin/manage/orders/setdelivery/{orderId}")
    public ResponseEntity<?> setOrderDelivery (@PathVariable String orderId){
        return orderService.setOrderDelivery(orderId);
    }
    @PutMapping(path = "/admin/manage/orders/setpaid/{orderId}")
    public ResponseEntity<?> setOrderPaid (@PathVariable String orderId){
        return orderService.setOrderPaid(orderId);
    }


    @PutMapping(path = "/shipper/orders/setpaid/{orderId}")
    public ResponseEntity<?> setOrderPaidShipper (@PathVariable String orderId){
        return orderService.setOrderPaid(orderId);
    }

    @PutMapping(path = "/shipper/orders/cancelship/{orderId}")
    public ResponseEntity<?> cancelOrderByShipper (@PathVariable String orderId){
        return orderService.cancelOrderbyShipper(orderId);
    }
}
