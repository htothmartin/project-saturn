package com.szte.saturn.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name = "verification_code")
@NoArgsConstructor
public class VerificationCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "email_sent", nullable = false)
    @Setter
    private boolean emailSent = false;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public VerificationCode(final User user) {
        this.user = user;
        this.code = UUID.randomUUID().toString();
    }
}
