package com.backend.backend.controller;

import static org.hamcrest.CoreMatchers.nullValue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.helper.ResponseErrorHelper;
import com.backend.backend.helper.ResponseSuccessHelper;
import com.backend.backend.model.savepost;
import com.backend.backend.repository.SavePostRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/savepost")


public class SavePostController {
	@Autowired
	SavePostRepository savePostRepo;
	@GetMapping("/get")
	public  ResponseEntity<?>  get(){
		return ResponseEntity.ok(savePostRepo.findAll());
		
	}
	@PostMapping("/create")
	public  ResponseEntity<?>  create(@Validated @RequestBody savepost req){
		try {
			savepost sv  = new savepost(req.getIdUser(),req.getIdPost());
			savepost result = savePostRepo.save(sv);
			return ResponseEntity.ok(new ResponseSuccessHelper<savepost>(result, true));
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.ok(new ResponseErrorHelper<String>(e.getMessage(), false));
		}
		
		
	}
	@DeleteMapping("/delete")
	public  ResponseEntity<?>  delete(@Validated @RequestBody savepost req){
		try {
			
			
			Integer result = savePostRepo.delete(req.getIdUser(), req.getIdPost());
			return ResponseEntity.ok(new ResponseSuccessHelper<Integer>(result, true));
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.ok(new ResponseErrorHelper<String>(e.getMessage(), false));
		}
		
		
	}
}
