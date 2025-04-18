package com.szte.saturn.entities;

import com.szte.saturn.controllers.requests.CreateUserRequest;
import com.szte.saturn.entities.rel_user_projects.RelUserProjects;
import com.szte.saturn.enums.Provider;
import com.szte.saturn.enums.Role;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Table(name = "users")
@Entity
@Getter
@Setter
@NoArgsConstructor
@Accessors(chain = true)
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firstname", nullable = false)
    private String firstname;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Column(name = "registered_at")
    @CreationTimestamp
    private LocalDateTime registeredAt;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl = "";

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RelUserProjects> relUserProjects = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<ConnectedAccount> connectedAccounts = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private VerificationCode verificationCode;

    @Column(name = "verified")
    private Boolean verified = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false)
    private Provider provider;

    public User(final CreateUserRequest request) {
        this.firstname = request.getFirstname();
        this.lastname = request.getLastname();
        this.email = request.getEmail();
        this.role = Role.USER;
        this.provider = Provider.EMAIL;
    }

    public User(final OAuth2User oAuth2User) {
        this.email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        if (name != null) {
            List<String> names = List.of(name.split(" "));
            if (names.size() > 1) {
                this.firstname = names.get(0);
                this.lastname = names.get(1);
            } else {
                this.firstname = names.getFirst();
                this.setLastname("");
            }
        }
        this.verified = true;
        this.setRole(Role.USER);
        this.setPassword("");
    }

    public void addConnectedAcoount(final ConnectedAccount connectedAccount) {
        connectedAccounts.add(connectedAccount);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
