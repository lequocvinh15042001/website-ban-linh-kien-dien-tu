package com.example.electronicshop.service;

import com.example.electronicshop.communication.request.CartRequest;
import com.example.electronicshop.communication.request.ReceiveOrderRequest;
import com.example.electronicshop.communication.response.CartItemResponse;
import com.example.electronicshop.communication.response.CartResponse;
import com.example.electronicshop.communication.response.OrderResponse;
import com.example.electronicshop.communication.response.ReceiveOrderResponse;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.CartMap;
import com.example.electronicshop.models.ReceiveOrder;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.models.enity.OrderProduct;
import com.example.electronicshop.models.enity.ProductElec;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.OrderProductRepository;
import com.example.electronicshop.repository.OrderRepository;
import com.example.electronicshop.repository.ProductElecRepository;
import com.example.electronicshop.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Synchronized;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartService {
  private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderProductRepository orderProductRepository;
    private final CartMap cartMapper;

    private final ProductElecRepository productElecRepository;

    public ResponseEntity<?> getAllProductFromCart(String userId) {
        Optional<User> user = userRepository.findUserByIdAndState(userId, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            Optional<Order> order = orderRepository.findOrderByUser_IdAndState(new ObjectId(userId), Constant.ORDER_INCART);
            if (order.isPresent()) {
                CartResponse res = cartMapper.toCartResAll(order.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Get cart success", res));
            } throw new NotFoundException("Can not found any order with user id: "+userId);
        } throw new NotFoundException("Can not found user with id: "+userId);
    }

    @Transactional
    public ResponseEntity<?> addProductToCart(String userId, CartRequest req) {
        Optional<User> user = userRepository.findUserByIdAndState(userId, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            Optional<Order> order = orderRepository.findOrderByUser_IdAndState(new ObjectId(userId), Constant.ORDER_INCART);
            if (order.isPresent()) {
                Optional<OrderProduct> product = orderProductRepository.findOrderProductByProductElec_IdAndOrder_Id(new ObjectId(req.getProductId()),new ObjectId(order.get().getId()));
              if(product.isPresent())   return countinueUpdateProductInCart(product.get(), req);
                else return AddProductToExistOrder(order.get(), req);
            }
            else {
                return AddProductToOrder(user.get(), req);
            }
        } throw new NotFoundException("Can not found user with id: "+userId);
    }

    public ResponseEntity<?>AddShiping(String order_id, ReceiveOrder receiveOrderRequest)
    {
      Optional<Order> order = orderRepository.findById(order_id);
      if(order.isPresent()) {
        order.get().setReceiveOrder(receiveOrderRequest);
        if(order.get().getReceiveOrder() != null) {
            order.get().setState(Constant.ORDER_PROCESS);
            order.get().setCreatedDate(LocalDateTime.now());
            orderRepository.save(order.get());
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("true", "Add shipping success", order));
        }
        else  return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("false", "Add shipping fail", ""));
      }

      else throw new NotFoundException("Can not found order with id: ");
      }


    @Transactional
    @Synchronized
    ResponseEntity<?> AddProductToOrder(User user, CartRequest req) {
        if (req.getQuantity() <= 0) throw new AppException(HttpStatus.BAD_REQUEST.value(), "Invalid quantity");
        Optional<ProductElec> productOption = productElecRepository.findById(req.getProductId());
        if (productOption.isPresent()) {
            checkProductQuantity(productOption.get(), req);
            Order order = new Order(user, Constant.ORDER_INCART);
            orderRepository.insert(order);
            OrderProduct item = new OrderProduct(productOption.get() ,req.getQuantity(), order);
            orderProductRepository.insert(item);
            CartItemResponse res = CartMap.toCartItemAllRes(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("true", "Add product to cart first time success", res));
        } else throw new NotFoundException("Can not found product with id: "+req.getProductId());
    }

    private ResponseEntity<?> AddProductToExistOrder(Order order, CartRequest req) {
        if (req.getQuantity() <= 0) throw new AppException(HttpStatus.BAD_REQUEST.value(), "Invalid quantity");
        Optional<ProductElec> product = productElecRepository.findProductByIdAndState(req.getProductId(), Constant.ENABLE);
        if (product.isPresent()) {
            checkProductQuantity(product.get(), req);
            OrderProduct orderProduct = new OrderProduct(product.get(), req.getQuantity(), order);
            orderProductRepository.insert(orderProduct);
            CartItemResponse res = CartMap.toCartItemAllRes(orderProduct);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("true", "Add product to cart success", res));
        } else throw new NotFoundException("Can not found product with id: "+req.getProductId());
    }

    private void checkProductQuantity(ProductElec productElec, CartRequest req) {

                if (productElec.getQuantity() < req.getQuantity() ) {
                    throw new AppException(HttpStatus.CONFLICT.value(), "Quantity exceeds stock on product: "+req.getProductId());
                }
            }


    private ResponseEntity<?> countinueUpdateProductInCart(OrderProduct orderProduct, CartRequest req) {
        if (orderProduct.getQuantity() + req.getQuantity() == 0) {
            orderRepository.deleteById(orderProduct.getId());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Delete item "+orderProduct.getId()+" in cart success", ""));
        }
        Optional <ProductElec> productElec = productElecRepository.findProductByIdAndState(req.getProductId(), Constant.ENABLE);
                long quantity = orderProduct.getQuantity() + req.getQuantity();
                if (productElec.get().getQuantity() >= quantity && quantity > 0) {
                    orderProduct.setQuantity(quantity);
                    orderProductRepository.save(orderProduct);
                }
                else throw new AppException(HttpStatus.CONFLICT.value(), "Quantity invalid or exceeds stock on product: "+req.getProductId());
        CartItemResponse res = CartMap.toCartItemAllRes(orderProduct);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("true", "Update product "+req.getProductId()+" in cart success", res));
    }



    public ResponseEntity<?> removeProductFromCart(String userId, String orderItemId) {
        Optional<User> user = userRepository.findUserByIdAndState(userId, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            Optional<OrderProduct> orderItem = orderProductRepository.findById(orderItemId);
            if (orderItem.isPresent() && orderItem.get().getOrder().getUser().getId().equals(userId)){
                orderProductRepository.deleteById(orderItemId);
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Delete item "+orderItemId+" in cart success", ""));
            }
            else throw new AppException(HttpStatus.NOT_FOUND.value(), "Can not found product in your cart");
        } throw new NotFoundException("Can not found user with id: "+userId);
    }

}


