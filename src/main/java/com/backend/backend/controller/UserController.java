package com.backend.backend.controller;


import java.util.List;
import java.util.Map;





import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.newbie;
import com.backend.backend.model.roles;
import com.backend.backend.model.users;
import com.backend.backend.repository.NewbieRepo;
import com.backend.backend.repository.RoleRepository;
import com.backend.backend.repository.UserRepository;



@RestController

public class UserController {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;

	@GetMapping("/get")
	public @ResponseBody  List<users> getAll() {
		
		return userRepository.findAll();
	}


}
