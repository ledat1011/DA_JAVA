package com.backend.backend.controller;

import java.math.BigInteger;
import java.net.URI;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backend.backend.DTO.JwtResponse;
import com.backend.backend.DTO.LoginRequest;
import com.backend.backend.DTO.MessageResponse;
import com.backend.backend.common.ERole;
import com.backend.backend.common.JwtUtils;
import com.backend.backend.model.newbie;
import com.backend.backend.model.roles;
import com.backend.backend.model.users;
import com.backend.backend.repository.NewbieRepo;
import com.backend.backend.repository.RoleRepository;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.UserDetailsImpl;

@RestController
@RequestMapping("/api/auth")
public class UserController {
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private NewbieRepo newbieRepo;
	@Autowired
	private PasswordEncoder passWordEncoder;


	@PostMapping("/login")
	public ResponseEntity<JwtResponse> authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		String JWT = jwtUtils.generateJwtToken(authentication);
		List<String> roles = userDetails.getAuthorities().stream().map(i -> i.getAuthority())
				.collect(Collectors.toList());
		return ResponseEntity.ok(
				new JwtResponse(JWT, userDetails.getId(),userDetails.getFirst_name(),userDetails.getLast_name() ,userDetails.getEmail(), userDetails.getPassword(), roles));

//			log.error( " oke ne");
//			return null;

	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody com.backend.backend.DTO.SignUpRequest signUpRequest) {
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("User exsist"));

		}

		BigInteger phone = BigInteger.valueOf(1234);

//         Creating user's account
		users user = new users(signUpRequest.getFirst_name(), signUpRequest.getLast_name(), phone,
				signUpRequest.getEmail(), passWordEncoder.encode(signUpRequest.getPassword()), (double) 100000, false,
				1, new Date());

//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        roles userRole = RoleRepository.findByname(ERole.admin)
//                .orElseThrow(() -> new AppException("User Role not set."));
//
//        user.setRoles(Collections.singleton(userRole));
//
		users result = userRepository.save(user);
//
//        URI location = ServletUriComponentsBuilder
//                .fromCurrentContextPath().path("/users/{username}")
//                .buildAndExpand(result.getUsername()).toUri();
//
//        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
		return null;
	}

	@GetMapping("/get")
	public @ResponseBody List<users> getAll() {
		log.debug("hahah");
		return userRepository.findAll();
	}

}
