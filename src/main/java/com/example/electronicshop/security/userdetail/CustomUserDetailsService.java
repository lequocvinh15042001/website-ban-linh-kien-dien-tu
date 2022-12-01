package com.example.electronicshop.security.userdetail;


import com.example.electronicshop.config.Constant;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final   UserRepository userRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findUserByEmailAndState(email, Constant.USER_ACTIVE);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User Not Found with user id: " + email);
        }
        return new CustomUserDetails(user.get());
    }
}
