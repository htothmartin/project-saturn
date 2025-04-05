package com.szte.saturn.services;

import com.szte.saturn.entities.User;
import com.szte.saturn.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final UserRepository userRepository;

    @Value("${spring.security.jwt.access-key}")
    private String accessSecretKey;

    @Value("${spring.security.jwt.refresh-key}")
    private String refreshSecretKey;


    @Value("${spring.security.jwt.expiration-time-access}")
    private long accessExpiration;

    @Getter
    @Value("${spring.security.jwt.expiration-time-refresh}")
    private long refreshExpiration;

    public JwtService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String extractUsername(final String token, final boolean isRefresh) {
        return extractClaim(token, Claims::getSubject, isRefresh);
    }

    public <T> T extractClaim(
            final String token,
            final Function<Claims, T> claimsResolver,
            final boolean isRefresh) {
        final Claims claims = extractAllClaims(token, isRefresh);
        return claimsResolver.apply(claims);
    }

    public String generateToken(final Long userId, final boolean isRefresh) {
        User userDetails = userRepository.findUserById(userId).orElse(null);

        return generateToken(new HashMap<>(), userDetails, isRefresh);
    }

    public String generateToken(
            final Map<String, Object> extraClaims,
            final UserDetails userDetails,
            final boolean isRefresh) {
        return buildToken(extraClaims, userDetails, isRefresh);
    }


    private String buildToken(
            final Map<String, Object> extraClaims,
            final UserDetails userDetails,
            final boolean isRefresh
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()
                        + (isRefresh ? refreshExpiration : accessExpiration)))
                .signWith(getSignInKey(isRefresh), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isValidToken(
            final String token,
            final UserDetails userDetails,
            final boolean isRefresh) {
        final String username = extractUsername(token, isRefresh);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token, isRefresh));
    }

    private boolean isTokenExpired(final String token, final boolean isRefresh) {
        return extractExpiration(token, isRefresh).before(new Date());
    }

    private Date extractExpiration(final String token, final boolean isRefresh) {
        return extractClaim(token, Claims::getExpiration, isRefresh);
    }

    private Claims extractAllClaims(final String token, final boolean isRefresh) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey(isRefresh))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey(final boolean isRefresh) {
        byte[] keyBytes = Decoders.BASE64.decode(isRefresh ? refreshSecretKey : accessSecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
