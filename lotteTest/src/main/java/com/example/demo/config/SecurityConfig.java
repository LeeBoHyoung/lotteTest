package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.example.demo.app.user.service.UserService;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Autowired UserService userService;
	@Autowired AuthFailureHandler authFailureHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
         http
         .csrf().ignoringAntMatchers("/user/signup", "/user/signupAction");
         	//.csrf().disable()
         http
              .authorizeRequests()
              		.antMatchers("/user/**", "/resources/**").permitAll()
              		.antMatchers("/project/**").hasAuthority("USER")
              		.antMatchers("/app/memberManage", "/app/userInfoPage").hasAuthority("ADMIN")
                   .anyRequest().authenticated()
                   .and()
              .formLogin()
              		.loginPage("/user/signin")
              		.loginProcessingUrl("/user/executeSignin")
              		.defaultSuccessUrl("/project/")
              		.failureHandler(authFailureHandler)
              		.permitAll()
         			.and()
                   .logout()
           			.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
           			.logoutSuccessUrl("/user/signin");
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
         auth.userDetailsService(userService)
         .passwordEncoder(userService.passwordEncoder());
    }
    /*
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
         return super.authenticationManagerBean();
    }*/
}
