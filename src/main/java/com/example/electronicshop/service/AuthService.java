package com.example.electronicshop.service;

import com.example.electronicshop.communication.request.LoginRequest;
import com.example.electronicshop.communication.request.Register;
import com.example.electronicshop.communication.request.VerifyCodeRequest;
import com.example.electronicshop.communication.response.LoginResponese;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.map.UserMap;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Token;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.UserRepository;
import com.example.electronicshop.security.jwt.JwtUtils;
import com.example.electronicshop.security.userdetail.CustomUserDetails;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Null;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
@Slf4j
@AllArgsConstructor
public class AuthService {
    private AuthenticationManager authenticationManager;
    private final UserMap userMapper;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

   public ResponseEntity<ResponseObject> login(LoginRequest req) {
       try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
            String accesstoken = jwtUtils.generateTokenFromUserId(user.getUser());
            LoginResponese res = userMapper.toLoginRes(user.getUser());
            res.setAccessToken(accesstoken);
            if(res != null)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("true", "Log in successfully ", res));
            else
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("flase", "Can't Log in ",""));

   } catch (
    BadCredentialsException ex) {
          ex.printStackTrace();
        throw new BadCredentialsException(ex.getMessage());


    }

    }

    public ResponseEntity<ResponseObject> registerShipper(Register req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new AppException(HttpStatus.CONFLICT.value(), "Email  exists");
        req.setPassword(passwordEncoder.encode(req.getPassword()));
        User user = userMapper.toUserShipper(req);
        user.setToken(null);
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("true", "Register ", user)
        );
    }


    public ResponseEntity<ResponseObject> register(Register req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new AppException(HttpStatus.CONFLICT.value(), "Email  exists");
        req.setPassword(passwordEncoder.encode(req.getPassword()));
        User user = userMapper.toUser(req);
        user.setToken(null);
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("true", "Register ", user)
        );
    }

    //Register with send mail


    public ResponseEntity<ResponseObject> registerWithMail(Register req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new AppException(HttpStatus.CONFLICT.value(), "Email already exists");
        req.setPassword(passwordEncoder.encode(req.getPassword()));
        User user = userMapper.toUserMail(req);
        if (user != null) {
            try {
                sendVerifyMail(user);
            } catch (Exception e) {
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("true", "Register successfully ", "")
        );
    }

    public ResponseEntity<ResponseObject> registerShipperWithMail(Register req) {
        if (userRepository.existsByEmail(req.getEmail()))
            throw new AppException(HttpStatus.CONFLICT.value(), "Email already exists");
        req.setPassword(passwordEncoder.encode(req.getPassword()));
        User user = userMapper.toUserShipperMail(req);
        if (user != null) {
            try {
                sendVerifyMail(user);
            } catch (Exception e) {
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("true", "Register successfully ", "")
        );
    }

    public ResponseEntity<?> reset(String email) {
        Optional<User> user = userRepository.findUserByEmailAndState(email, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            try {
                sendVerifyMail(user.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Send email reset password success", email));
            } catch (Exception e) {
                e.printStackTrace();
                log.error(e.getMessage());
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Failed to send reset email");
            }
        }
        throw new NotFoundException("Can not found user with email " + email + " is activated");
    }

    @SneakyThrows
    public void sendVerifyMail(User user) {
        String token = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));
        Map<String, Object> model = new HashMap<>();
        model.put("token", token);
        user.setToken(new Token(token, LocalDateTime.now().plusMinutes(10)));
        userRepository.save(user);
        emailService.sendEmail(user.getEmail(), model, MailType.VetifyShop);
    }
    public ResponseEntity<?> sendMailGetOTP(String email) {
        Optional<User> user = userRepository.findUsersByEmail(email);
        if (user.isPresent()) {
            try {
                sendVerifyMail(user.get());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Send otp email success", email));
            } catch (Exception e) {
                e.printStackTrace();
                log.error(e.getMessage());
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "Failed to send reset email");
            }
        }
        throw new NotFoundException("Can not found user with email " + email + " is activated");
    }

  public ResponseEntity<?> verifyCode(VerifyCodeRequest req) {
        switch (req.getType().toLowerCase()) {
            case "register":
                return verifyRegister(req.getEmail(), req.getOtp());
            case "reset":
                return verifyReset(req.getEmail(), req.getOtp());
            default:
                throw new NotFoundException("Can not found type of verify");
        }
    }

    private ResponseEntity<?> verifyReset(String email, String otp) {
        Optional<User> user = userRepository.findUserByEmailAndState(email, Constant.USER_ACTIVE);
        if (user.isPresent()) {
            Map<String, Object> res = new HashMap<>();
            if (LocalDateTime.now().isBefore(user.get().getToken().getStore())) {
                if (user.get().getToken().getOtp().equals(otp)) {
                    res.put("id", user.get().getId());
                    res.put("token", jwtUtils.generateTokenFromUserId(user.get()));
                    user.get().setPassword(user.get().getToken().getOtp());
                    userRepository.save(user.get());
                }
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "OTP with email: " + email , res));
            } else {
                user.get().setToken(null);
                userRepository.save(user.get());
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "OTP fail");
            }
        }
        throw new NotFoundException("Can not found user with email " + email + " is activated");
    }

    private ResponseEntity<ResponseObject> verifyRegister(String email, String otp) {
        Optional<User> user = userRepository.findUserByEmailAndState(email, Constant.USER_NOT_VERIFY);
        if (user.isPresent()) {
            if (LocalDateTime.now().isBefore(user.get().getToken().getStore())) {
                if (user.get().getToken().getOtp().equals(otp)) {
                    user.get().setState(Constant.USER_ACTIVE);
                    user.get().setToken(null);
                    userRepository.save(user.get());
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("true", "OTP with email: " + email + " is " + "true", user));
                }

            } else {
                user.get().setToken(null);
                userRepository.save(user.get());
                throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "OTP fail");
            }
        }
        throw new NotFoundException("Can not found user with email " + email);
    }
}
