package com.backend.backend.controller;

import java.math.BigInteger;
import java.net.URI;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
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
import org.springframework.web.bind.annotation.CrossOrigin;
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

import com.backend.backend.DTO.ErrorResponse;
import com.backend.backend.DTO.GetToken;
import com.backend.backend.DTO.JwtResponse;
import com.backend.backend.DTO.LoginRequest;
import com.backend.backend.DTO.MessageResponse;
import com.backend.backend.common.ERole;
import com.backend.backend.common.JwtUtils;
import com.backend.backend.model.newbie;
import com.backend.backend.model.posts;
import com.backend.backend.model.roles;
import com.backend.backend.model.savepost;
import com.backend.backend.model.users;
import com.backend.backend.repository.NewbieRepo;
import com.backend.backend.repository.RoleRepository;
import com.backend.backend.repository.SavePostRepository;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.UserDetailsImpl;
import com.fasterxml.jackson.databind.util.JSONPObject;

@CrossOrigin
@RestController
@RequestMapping("/api/account")
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
	@Autowired
	private SavePostRepository savepostRepo;

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Validated @RequestBody LoginRequest loginRequest) {
		try {

			log.error(loginRequest.toString());
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassWord()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

			String JWT = jwtUtils.generateJwtToken(authentication);
			List<String> roles = userDetails.getAuthorities().stream().map(i -> i.getAuthority())
					.collect(Collectors.toList());
			users user = new users();
			user.setId(userDetails.getId());
			user.setEmail(userDetails.getEmail());
			user.setFirst_name(userDetails.getFirst_name());
			user.setLast_name(userDetails.getLast_name());
			return ResponseEntity.ok(new JwtResponse(JWT, user, savepostRepo.findByIdUser(userDetails.getId()),true));

		} catch (Exception e) {
			return ResponseEntity.ok(new ErrorResponse(e.getMessage(), false));
		}

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
				new Date(), new Date(), false, 1);

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
//                .buildAndExpand(result.getEmail()).toUri();

//        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
		return null;
	}

	@PostMapping("/auth")
	public ResponseEntity<?> auth(@Valid @RequestBody GetToken token) throws ParseException {
//		JSONParser parser = new JSONParser();
//
//	
//		JSONObject json = (JSONObject) parser.parse(token);
//		
//		log.error( (String)json.get("token"));
		try {
			if (jwtUtils.validateJwtToken(token.getToken())) {
				int id = Integer.parseInt(jwtUtils.getIdFromJwtToken(token.getToken()));
				users user = (users)(userRepository.findOnes( id));
				return ResponseEntity.ok(new JwtResponse(token.getToken(), user, savepostRepo.findByIdUser(id),true));
			}else {
				HashMap<String, String> hashMap = new HashMap<String, String>();
//				hashMap.put("status", false);
				return ResponseEntity.ok("oke n't");
			}
		} catch (Exception e) {
			return ResponseEntity.ok(e);
			// TODO: handle exception
		}
	
	}

	@GetMapping("/get")
	public @ResponseBody List<users> getAll() {
		try {

			return userRepository.findAll();
		} catch (Exception e) {
			log.debug(e.getMessage());
			return null;
			// TODO: handle exception
		}

	}
	
	
}
