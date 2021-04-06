package com.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.posts;
import com.backend.backend.model.savepost;
import com.backend.backend.model.users;
import com.backend.backend.repository.PostRepository;
import com.backend.backend.repository.SavePostRepository;

@RestController
@RequestMapping("/api")
public class TestAPI {
	@Autowired
	private SavePostRepository savepostRepo;
	@Autowired
	private PostRepository postRepo;
	@GetMapping("/test")
	public ResponseEntity<?>  getAll() {
		try {
			
			return  ResponseEntity.ok(postRepo.findAll());
		} catch (Exception e) {
			
			return ResponseEntity.ok(e);
			// TODO: handle exception
		}
		
	}
}
