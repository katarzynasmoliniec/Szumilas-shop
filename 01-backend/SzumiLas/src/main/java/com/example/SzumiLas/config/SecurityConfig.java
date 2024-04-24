package com.example.SzumiLas.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
class SecurityConfig {

    public static final String ADMIN = "admin";
    public static final String USER = "user";
    private final JwtAuthConverter jwtAuthConverter;

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        //protect endpoint /api/orders
        http.authorizeHttpRequests(requests ->
                        requests

                .requestMatchers(HttpMethod.GET, "/api/cart-details/**").hasAuthority(USER)
                .requestMatchers(HttpMethod.DELETE, "/api/images/**").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/images/**").hasAuthority((ADMIN))
                .requestMatchers(HttpMethod.POST, "/api/products").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.GET).permitAll()
                .requestMatchers(HttpMethod.POST, "/api/checkout/**" ).permitAll()
                                .anyRequest().permitAll())
            .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer
                .jwt()
                .jwtAuthenticationConverter(jwtAuthConverter));

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // + CORS filters
        http.cors(Customizer.withDefaults());

        // + content negotiation strategy
        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

       // we are not using Cookies for session tracking >> disable CSRF
        http.csrf(AbstractHttpConfigurer::disable);

        return http.build();
    }
}