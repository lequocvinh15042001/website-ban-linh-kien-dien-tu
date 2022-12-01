package com.example.electronicshop.models.enity;

import com.example.electronicshop.models.provider.ESocial;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String name;
    @Size(max = 50)
    @Email
    @Indexed(unique = true)
    private String email;
    @Size( min = 5, max = 50)
    @JsonIgnore
    private String password;
    private String phone;
    private String address;
    private String role;
    private String state;
    @JsonIgnore
    private Token token;
    @JsonIgnore
    private List<Order> orders;
    @ReadOnlyProperty
    @DocumentReference(lookup="{'user':?#{#self._id} }", lazy = true)
    @JsonIgnore
    private List<Comment> comments;
    private ESocial social;

    public User(String name, String email, String password, String phone, String address, String role, String state, ESocial social) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.state = state;
        this.social = social;
    }


}
