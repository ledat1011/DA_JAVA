package com.backend.backend.config;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.backend.service.UserDetailsServiceImpl;
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled =  true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Resource(name = "userService")
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Bean
	public AuthTokenFilter jwtAuthenticationFilter() {
		return new AuthTokenFilter();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsServiceImpl) // Cung cáp userservice cho spring security
				.passwordEncoder(PasswordEncoder()); // cung cấp password encoder
	}

	@Bean
	public PasswordEncoder PasswordEncoder() {
		// TODO Auto-generated method stub
		return new BCryptPasswordEncoder();
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		// Get AuthenticationManager Bean
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors()
//		.and().csrf().disable().exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
//				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
//				.antMatchers("/api/auth/**").permitAll().antMatchers("api/test").permitAll().anyRequest()
//				.authenticated();
	                    .and()
	                .csrf()
	                    .disable()
	                .authorizeRequests()
	                    .antMatchers("/api/auth/**").permitAll() // Cho phép tất cả mọi người truy cập vào 2 địa chỉ này
	                    .anyRequest().authenticated(); // Tất cả các request khác đều cần phải xác thực mới được truy cập

		// Thêm một lớp Filter kiểm tra jwt
		http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

	}
}
