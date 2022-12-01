package com.example.electronicshop.service;

import com.example.electronicshop.communication.response.OrderResponse;
import com.example.electronicshop.communication.response.OrderSale;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.OrderMap;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMap orderMapper;

    public ResponseEntity<?> findAllState(String state, Pageable pageable) {
        Page<Order> orders;
        orders = orderRepository.findAllByState(state, pageable);
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderShipperRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        resp.put("totalQuantity", orders.getTotalElements());
        resp.put("totalPage", orders.getTotalPages());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success", resp));
    }

    public ResponseEntity<?> findAllOrder() {
        List<Order> orders = orderRepository.findAll();
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderDetailShipperRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success",resp));
    }

    public ResponseEntity<?> findAllOrderPage(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderDetailShipperRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success",resp));
    }

    public  ResponseEntity<?> findAllOrderStateProcess(Pageable pageable){
        Page<Order> orders = orderRepository.findAllByState(Constant.ORDER_PROCESS,pageable);
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderDetailShipperRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success",resp));

    }

    public  ResponseEntity<?> findAllOrderStatePaid(Pageable pageable){
        Page<Order> orders = orderRepository.findAllByState(Constant.ORDER_PAID,pageable);
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderDetailShipperRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success",resp));

    }
    public  ResponseEntity<?> findAllOrderStateDeliver(Pageable pageable){
       Page<Order> orders = orderRepository.findAllByState(Constant.ORDER_DELIVERY,pageable);
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderDetailShipperRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success",resp));

    }
    public  ResponseEntity<?> findAllOrderStateCancel(Pageable pageable){
        Page<Order> orders = orderRepository.findAllByState(Constant.ORDER_CANCEL,pageable);
        if (orders.isEmpty()) throw new NotFoundException("Can not found any orders");
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderDetailShipperRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders success",resp));

    }



    public ResponseEntity<?> findOrderById(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent()) {
//            OrderResponse orderRes = orderMapper.toOrderDetailRes(order.get());

            OrderResponse orderRes = orderMapper.toOrderDetailShipperRes(order.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", orderRes));
        }
        throw new NotFoundException("Can not found order with id: " + id);
    }


    public ResponseEntity<?> findOrderByUserId(String id, String userId) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() && order.get().getUser().getId().equals(userId)) {
//            OrderResponse orderRes = orderMapper.toOrderDetailRes(order.get());

            OrderResponse orderRes = orderMapper.toOrderDetailShipperRes(order.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", orderRes));
        }
        throw new NotFoundException("Can not found order with id: " + id);
    }

    public ResponseEntity<?> findOrderByShipperId(String id, String userId) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() && order.get().getShipper().getId().equals(userId)) {
//            OrderResponse orderRes = orderMapper.toOrderDetailRes(order.get());

            OrderResponse orderRes = orderMapper.toOrderDetailShipperRes(order.get());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", orderRes));
        }
        throw new NotFoundException("Can not found order with id: " + id);
    }

    public ResponseEntity<?> findAllOrderByUserId(String userId) {
        List<Order> orders = orderRepository.findOrderByUser_Id(new ObjectId(userId));
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderDetailResAll).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        if(orders.size()>0){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", resp));
    }
        throw new NotFoundException("Can not found any order " );
    }

    public ResponseEntity<?> chooseOrderByShipper(String orderid, User shipper)
    {
        Optional<Order> order  = orderRepository.findById(orderid);
        if(order.isPresent()){
            order.get().setShipper(shipper);
            order.get().setState(Constant.ORDER_DELIVERY);
            orderRepository.save(order.get());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", order));
        }
        throw new NotFoundException("Can not found any order " );
    }

    public ResponseEntity<?> findAllOrderByShipperId(String shipperId) {
        List<Order> orders = orderRepository.findByShipper(new ObjectId(shipperId));
        List<OrderResponse> resList = orders.stream().map(orderMapper::toOrderShipperRes).collect(Collectors.toList());
        Map<String, Object> resp = new HashMap<>();
        resp.put("list", resList);
        if(orders.size()>0){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Get order success", resp));
        }
        throw new NotFoundException("Can not found any order " );
    }


    public ResponseEntity<?> cancelOrder(String id, String userId) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() && order.get().getUser().getId().equals(userId)) {
            if (
                    order.get().getState().equals(Constant.ORDER_PROCESS) ) {
                order.get().setState(Constant.ORDER_CANCEL);
                orderRepository.save(order.get());
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("true", "Cancel order successfully", order));
                }
            } else throw new AppException(HttpStatus.BAD_REQUEST.value(),
                    "You cannot cancel or refund while the order is still processing!");
        throw new NotFoundException("Can not found order with id: " + id);
    }

    public ResponseEntity<?> setOrderDelivery(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() ) {
            if (
                    order.get().getState().equals(Constant.ORDER_PROCESS) ) {
                order.get().setState(Constant.ORDER_DELIVERY);
                orderRepository.save(order.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Set state order successfully", order));
            }
        } else throw new AppException(HttpStatus.BAD_REQUEST.value(),
                "You cannot set state order");
        throw new NotFoundException("Can not found order with id: " + id);
    }

    public ResponseEntity<?> setOrderPaid(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() ) {
            if (order.get().getState().equals(Constant.ORDER_DELIVERY) ) {
                order.get().setState(Constant.ORDER_PAID);
                order.get().setLastModifiedDate(LocalDateTime.now());
                orderRepository.save(order.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Set state order successfully", order));
            }
        } else throw new AppException(HttpStatus.BAD_REQUEST.value(),
                "You cannot set state order");
        throw new NotFoundException("Can not found order with id: " + id);
    }
//    public String checkingUpdateQuantityProduct(Order order, boolean isPaid) {
//        order.getProductElecList().forEach(item -> {
//                if (isPaid) {
//                    if (item.getColor().equals(i.getColor()) && i.getStock() < item.getQuantity()) {
//                        orderRepository.save(order);
//                        throw new AppException(HttpStatus.CONFLICT.value(),
//                                "Quantity exceeds the available stock on hand at Product:" +
//                                        item.getItem().getProduct().getName());
//                    } else i.setStock(i.getStock() - item.getQuantity());
//                } else i.setStock(i.getStock() + item.getQuantity());
//            });
//            try {
//                productOptionRepository.save(item.getItem());
//            } catch (MongoWriteException e) {
//                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Failed when update quantity");
//            }
//        });
//        return null;
//    }

    public ResponseEntity<?> cancelOrderbyShipper(String id) {
        Optional<Order> order = orderRepository.findById(id);
        if (order.isPresent() ) {
            if (order.get().getState().equals(Constant.ORDER_DELIVERY) ) {
                order.get().setState(Constant.ORDER_PROCESS);
                orderRepository.save(order.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Set state order successfully", order));
            }
        } else throw new AppException(HttpStatus.BAD_REQUEST.value(),
                "You cannot set state order");
        throw new NotFoundException("Can not found order with id: " + id);
    }



    public ResponseEntity<?> getOrderStatistical(String from, String to, String type) {
        LocalDateTime fromDate = LocalDateTime.now();
        LocalDateTime toDate = LocalDateTime.now();
        String pattern = "dd-MM-yyyy";
        DateTimeFormatter df = DateTimeFormatter.ofPattern(pattern);
        try {
            if (!from.isBlank()) fromDate = LocalDate.parse(from, df).atStartOfDay();
            if (!to.isBlank()) toDate = LocalDate.parse(to, df).atStartOfDay();
        } catch (DateTimeParseException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            throw new AppException(HttpStatus.BAD_REQUEST.value(), "Incorrect date format");
        }
//        Page<Order> orderList = orderRepository.findAllByCreatedDateBetweenAndState(fromDate, toDate, Constant.ORDER_PAID, Pageable.unpaged());
        List<Order> orderList = orderRepository.findAllByCreatedDateBetweenAndState(fromDate, toDate, Constant.ORDER_PAID);
        switch (type) {
            case "all":
//                orderList = orderRepository.findAllByState(Constant.ORDER_PAID, PageRequest.of(0, Integer.MAX_VALUE, Sort.by("lastModifiedDate").ascending()));
                orderList = orderRepository.findAllByState(Constant.ORDER_PAID);
                pattern = "";
                break;
            case "month":
                pattern = "MM-yyyy";
                break;
            case "year":
                pattern = "yyyy";
                break;
        }
        List<OrderSale> ordersSaleResList = getSaleAmount(orderList, pattern);
        return ordersSaleResList.size() > 0 ? ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Get orders sale successful", ordersSaleResList)) :
                ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("false", "Can not found any order", "")
                );
    }

    public List<OrderSale> getSaleAmount(List<Order> orderList, String pattern) {
        List<OrderSale> ordersSaleResList = new ArrayList<>();
        DateTimeFormatter df = DateTimeFormatter.ofPattern(pattern);
        if (orderList.size() > 0) {
            OrderSale ordersSaleRes = new OrderSale();
            int quantity = 1;
            for (int i = 0; i <= orderList.size() - 1; i++) {
                String dateFormat = df.format(orderList.get(i).getLastModifiedDate());
                if (i == 0 || !ordersSaleRes.getDate().equals(dateFormat)) {
                    if (i > 0) ordersSaleResList.add(ordersSaleRes);
                    if (dateFormat.isBlank()) dateFormat = "all";
                    ordersSaleRes = new OrderSale(dateFormat,
                            orderList.get(i).getTotalPrice(), quantity);
                } else {
                    quantity++;
                    ordersSaleRes.setAmount(ordersSaleRes.getAmount().add(orderList.get(i).getTotalPrice()));
                    ordersSaleRes.setOrderQuantity(quantity);
                }
                if (i == orderList.size() - 1) ordersSaleResList.add(ordersSaleRes);
            }
        }
        return ordersSaleResList;
    }
}
