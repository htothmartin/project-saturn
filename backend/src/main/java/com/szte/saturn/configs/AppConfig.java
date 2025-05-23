package com.szte.saturn.configs;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class AppConfig {
    @Value("${app.frontend.host}")
    private String frontendHost;

    private final int SECOND_IN_MILLISECONDS = 1000;

}
