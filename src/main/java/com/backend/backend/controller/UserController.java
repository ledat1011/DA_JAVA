package com.backend.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backen.backend.DTO.JwtResponse;
import com.backen.backend.DTO.LoginRequest;
import com.backend.backend.common.JwtUtils;
import com.backend.backend.model.newbie;
import com.backend.backend.model.users;
import com.backend.backend.repository.NewbieRepo;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.UserDetailsImpl;

@RestController
@RequestMapping("/api/auth")
public class UserController {
	private static final Logger log = LoggerFactory.getLogger(JwtUtils.class);
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private NewbieRepo newbieRepo;

	@PostMapping("/login")
	public Exception authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {
		try {
			Authentication authentication = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
	SecurityContextHolder.getContext().setAuthentication(authentication);
	UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

	String JWT = jwtUtils.generateJwtToken(authentication);
	List<String> roles = userDetails.getAuthorities().stream().map(i -> i.getAuthority())
			.collect(Collectors.toList());
//	return ResponseEntity.ok(new JwtResponse(JWT,
//		userDetails.getId(),userDetails.getEmail(),userDetails.getPassword(),roles));
	log.error(loginRequest.getEmail() + " oke ne");
	return null ;
		} catch (Exception e) {
			log.error(e.getMessage());
			return e;
		}

	}
//	public @ResponseBody  List<users> getAll() {
//		log.debug("hahah");
//		return userRepository.findAll();
//	}

}
