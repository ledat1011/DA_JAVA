package com.backend.backend.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.backend.backend.common.JwtUtils;

@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {
	private static final Logger LOGGER = LoggerFactory.getLogger(AuthEntryPointJwt.class);
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		// TODO Auto-generated method stub
		LOGGER.error("Unauthorrizeddd err: {}", authException.getMessage());
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Error:Unauthorrizedddd from authEntry");
		
	}

}
