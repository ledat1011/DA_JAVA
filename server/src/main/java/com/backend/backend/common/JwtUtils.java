package com.backend.backend.common;

import java.nio.file.attribute.UserPrincipal;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.backend.backend.model.users;
import com.backend.backend.service.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;


@Component
public class JwtUtils {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtils.class);
	
//	@Value("${bezkoder.app.jwtSecret}")
	private static final String jwtSectret ="bezKoderSecretKey";
	
//	@Value("${bezkoder.app.jwtExpirationMs}")
	private static final int jwtExpirationMs =86400000;
	
	public String generateJwtToken(Authentication authentication) {
		
		UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authentication.getPrincipal();
		return Jwts.builder()
				.setSubject(userDetailsImpl.getEmail())
				.setId( userDetailsImpl.getId().toString())
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSectret)
				.compact();
	}
public String generateJwtToken(users user) {
		
		
		return Jwts.builder()
				.setSubject(user.getEmail())
				.setId( String.valueOf(user.getId()) )
				.setIssuedAt(new Date())
				.setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
				.signWith(SignatureAlgorithm.HS512, jwtSectret)
				.compact();
	}
	public String getEmailFromJwtToken (String token) {
		return Jwts.parser().setSigningKey(jwtSectret).parseClaimsJws(token).getBody().getSubject();
	}
	public String getIdFromJwtToken (String token) {
		return Jwts.parser().setSigningKey(jwtSectret).parseClaimsJws(token).getBody().getId();
	}
	public  boolean validateJwtToken( String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSectret).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			LOGGER.error("Invalid JWT signature :{}", e.getMessage());
			// TODO: handle exception
		}catch (MalformedJwtException e) {
			LOGGER.error("Invalid JWT token :{}", e.getMessage());
			// TODO: handle exception
		}catch (ExpiredJwtException e) {
			LOGGER.error("Invalid JWT Expired :{}", e.getMessage());
			// TODO: handle exception
		}catch (Exception e) {
			LOGGER.error( e.getMessage());
			// TODO: handle exception
		}
		return false;
		
	}
}
