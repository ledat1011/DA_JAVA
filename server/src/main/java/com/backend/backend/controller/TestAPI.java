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
import com.backend.backend.model.typepost;
import com.backend.backend.model.users;
import com.backend.backend.repository.BinhLuanRepository;
import com.backend.backend.repository.DistrictRepository;
import com.backend.backend.repository.FormPostRepository;
import com.backend.backend.repository.PostRepository;
import com.backend.backend.repository.ProvinceRepository;
import com.backend.backend.repository.SavePostRepository;
import com.backend.backend.repository.StreetRepository;
import com.backend.backend.repository.TypePostRepository;
import com.backend.backend.repository.WardRepository;
import com.backend.backend.repository.tienichRepository;
import com.backend.backend.repository.UserRepository;


@RestController
@RequestMapping("/api")
public class TestAPI {
	
	@Autowired
	private tienichRepository tienichRepo; 
	@Autowired
	private SavePostRepository savepostRepo;
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PostRepository postRepo;
	@Autowired
	private TypePostRepository typeosRepo;
	@Autowired
	private ProvinceRepository provinceRepo;
	@Autowired
	private DistrictRepository districtRepo;
	@Autowired
	private WardRepository wardRepo;
	@Autowired
	private StreetRepository streetRepo;
	@Autowired
	private BinhLuanRepository binhluanRepo;
	
	@Autowired
	private FormPostRepository formpostRepo;
	@GetMapping("/test")
	public ResponseEntity<?>  getAll() {
		try {
			
			return  ResponseEntity.ok(tienichRepo.findAll());
		} catch (Exception e) {
			
			return ResponseEntity.ok(e);
			// TODO: handle exception
		}
		
	}
	
	@GetMapping("/test2")
	public String getAll2() {
		 
		return "hello";
		
	}
}
