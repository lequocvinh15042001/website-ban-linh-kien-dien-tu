package com.example.electronicshop.config;

import com.example.electronicshop.security.jwt.EntryJwt;
import com.example.electronicshop.security.jwt.JwtFilt;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class WebSecutity {
    private final JwtFilt jwtFilter;
    private final EntryJwt unauthorizedHandler;
    private final String[] ALLOWED_LIST_URLS = {
            "/api/auth/**",
            "/api/oauth/**",
            "/oauth2/**",
            "/login/**",

    };

    private final String[] ALLOWED_GET_LIST_URLS = {
            "/api/products/**",
            "/api/categories/**",
            "/api/brands/**",
            "/api/auth/**",
            "/api/comment/**",
            "/api/productelec/**",
            "/api/cart/**",
            "/api/orders/**",


    };

//    @Value("http://localhost:3000")
//    private String [] allowOrigin;
    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {

        http.csrf().disable().cors().and()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers(ALLOWED_LIST_URLS).permitAll().and()
                .authorizeRequests().antMatchers(HttpMethod.GET, ALLOWED_GET_LIST_URLS).permitAll().and()
                .authorizeRequests().antMatchers("/api/admin/**")
//                .hasAnyAuthority( Constant.ROLE_ADMIN).and()
                .hasAnyAuthority( Constant.ROLE_ADMIN).and()
                .authorizeRequests().antMatchers("/api/**")
                .hasAnyAuthority(Constant.ROLE_USER, Constant.ROLE_ADMIN,Constant.ROLE_SHIPPER).and()
                .authorizeRequests().antMatchers("/api/shipper/**")
                .hasAnyAuthority(Constant.ROLE_SHIPPER, Constant.ROLE_ADMIN)
                .anyRequest().authenticated();



        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();


    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:3001","http://localhost:3002"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token", "origin", "x-request-with", "accept"));
        configuration.setExposedHeaders(List.of("x-auth-token"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }

    @Bean
    public AuthenticationManager authenticationManager (
            AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
