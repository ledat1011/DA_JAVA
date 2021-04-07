package com.backend.backend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.repository.PostRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/post")
public class PostController {
	private static final Logger log = LoggerFactory.getLogger(PostController.class);
	@Autowired
	private PostRepository postRepo;
	@GetMapping("/get")
	public ResponseEntity<?>  get() {
		try {
			
			return  ResponseEntity.ok(postRepo.findAll());
		} catch (Exception e) {
			
			return ResponseEntity.ok(e);
			// TODO: handle exception
		}
		
	}
	
	/*
	 * for detail
	 * 
	 * 
	 * */
	@PostMapping("/getpostbyid")
	public ResponseEntity<?>  getpostbyid(@Validated @RequestBody String id) {
		try {
			
			log.error(id);
			
			return  ResponseEntity.ok(postRepo.findAll());
		} catch (Exception e) {
			
			return ResponseEntity.ok(e);
			// TODO: handle exception
		}
		
	}
	
}
