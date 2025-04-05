package com.szte.saturn.utils;

import com.szte.saturn.entities.ConnectedAccount;
import com.szte.saturn.entities.User;
import com.szte.saturn.enums.Provider;
import com.szte.saturn.repositories.ConnectedAccountRepository;
import com.szte.saturn.repositories.UserRepository;
import com.szte.saturn.services.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final ConnectedAccountRepository connectedAccountRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private static final int SECOND_IN_MILLISECONDS = 1000;

    @Override
    @Transactional
    public void onAuthenticationSuccess(
            final HttpServletRequest request,
            final HttpServletResponse response,
            final Authentication authentication) throws IOException {

        OAuth2AuthenticationToken authenticationToken = (OAuth2AuthenticationToken) authentication;
        String provider = authenticationToken.getAuthorizedClientRegistrationId();
        String providerId = authenticationToken.getName();
        String email = authenticationToken.getPrincipal().getAttributes().get("email").toString();

        Optional<ConnectedAccount> connectedAccount = connectedAccountRepository
                .findByProviderAndProviderId(provider, providerId);

        if (connectedAccount.isPresent()) {
            authenticateUser(connectedAccount.get().getUser(), response);
            return;
        }

        User existingUser = userRepository.findByEmail(email).orElse(null);
        if (existingUser != null) {
            ConnectedAccount newConnectedAccount =
                    new ConnectedAccount(provider, providerId, existingUser);
            existingUser.addConnectedAcoount(newConnectedAccount);
            userRepository.save(existingUser);
            connectedAccountRepository.save(newConnectedAccount);
            authenticateUser(existingUser, response);
        } else {
            User newUser = createUserFromOAuth2User(authenticationToken);
            authenticateUser(newUser, response);
        }
    }

    private void authenticateUser(
            final User user,
            final HttpServletResponse response) throws IOException {
        UsernamePasswordAuthenticationToken token =
                new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(token);
        String refreshToken = jwtService.generateToken(user.getId(), true);
        Cookie cookie = new Cookie("refresh-token", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) jwtService.getRefreshExpiration() / SECOND_IN_MILLISECONDS);

        response.addCookie(cookie);

        response.sendRedirect("http://localhost:3000/projects");
    }

    private User createUserFromOAuth2User(final OAuth2AuthenticationToken authentication) {
        User user = new User(authentication.getPrincipal());
        System.out.println(user.getEmail());
        String provider = authentication.getAuthorizedClientRegistrationId();
        String providerId = authentication.getName();
        ConnectedAccount connectedAccount = new ConnectedAccount(provider, providerId, user);
        user.addConnectedAcoount(connectedAccount);

        switch (provider) {
            case "google":
                user.setProvider(Provider.GOOGLE);
                break;
            case "github":
                user.setProvider(Provider.GITHUB);
                break;
            default:
                user.setProvider(Provider.EMAIL);
        }
        user = userRepository.save(user);
        connectedAccountRepository.save(connectedAccount);

        return user;
    }
}
