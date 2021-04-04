//package com.backend.backend.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.backend.backend.model.savepost;
//import com.backend.backend.model.users;
//import com.backend.backend.repository.SavePostRepository;
//
//@RestController
//@RequestMapping("/api/auth")
//public class TestAPI {
//	@Autowired
//	private SavePostRepository savepostRepo;
//	@GetMapping("/test")
//	public @ResponseBody List<savepost> getAll() {
//		try {
//			
//			return savepostRepo.findByIdUser(16);
//		} catch (Exception e) {
//			
//			return null;
//			// TODO: handle exception
//		}
//		
//	}
//}
