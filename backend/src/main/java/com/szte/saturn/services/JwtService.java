package com.szte.saturn.services;

import com.szte.saturn.entities.User;
import com.szte.saturn.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
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
    @Value("${security.jwt.access-key}")
    private String accessSecretKey;

    @Value("${security.jwt.refresh-key}")
    private String refresSecretKey;

    @Value("${security.jwt.expiration-time-access}")
    private long accessExpiration ;

    @Value("${security.jwt.expiration-time-refresh}")
    private long refreshExpiration;

    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(int userId, boolean isRefresh) {
        User userDetails = userRepository.findUserById(userId).orElse(null);

        return generateToken(new HashMap<>(), userDetails, isRefresh);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails, boolean isRefresh) {
        if(isRefresh){
            return buildToken(extraClaims, userDetails, refreshExpiration);
        }
        return buildToken(extraClaims, userDetails, accessExpiration);
    }

    public long getAccessExpirationTime() {
        return accessExpiration;
    }
    public long getRefreshExpirationTime() {
        return refreshExpiration;
    }


    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(accessSecretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
