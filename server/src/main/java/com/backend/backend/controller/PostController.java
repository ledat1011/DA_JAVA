package com.backend.backend.controller;

import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.helper.ResponseErrorHelper;
import com.backend.backend.helper.ResponseSuccessHelper;
import com.backend.backend.model.posts;
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
	@GetMapping("/getpostbyprovince/{id}")
	public ResponseEntity<?> getpostbyprovince (@PathVariable  int id) {
		try {
			
			
			
			return  ResponseEntity.ok(postRepo.findByidProvince(id));
		} catch (Exception e) {
			
			return ResponseEntity.ok(e);
			// TODO: handle exception
		}
		
	}
	// for user
	@GetMapping("/v1/getpostbyid/{idUser}")
	public  ResponseEntity<?> getpostbyid(@PathVariable  int idUser) {
try {
	
			return  ResponseEntity.ok(new ResponseSuccessHelper<List<posts>>(postRepo.findByIdUser(idUser), true));
		} catch (Exception e) {
			
			return ResponseEntity.ok(new ResponseErrorHelper<String>(e.getMessage(),false));
			// TODO: handle exception
		}

	}
	//for search
	@PersistenceContext
	EntityManager em  ; 
	@GetMapping("/search")
	public  ResponseEntity<?> search(@RequestParam  Map<String, String> reqParam) {
try {

	String removeFromThisPart = "AND";	
	 String  Query = "SELECT * FROM posts p WHERE  ";
	 for ( Map.Entry<String, String> entry : reqParam.entrySet()) {
		    String k = entry.getKey();
		    String v = entry.getValue();
			Query += k + "="+ v +" AND ";
		}
	 Query = Query.substring(0, Query .lastIndexOf(removeFromThisPart ));
	List<posts> lists = em.createNativeQuery(Query,posts.class).getResultList();
			return  ResponseEntity.ok(new ResponseSuccessHelper<List<posts>>(lists, true));
//	 return ResponseEntity.ok(Query); 
		} catch (Exception e) {
			
			return ResponseEntity.ok(new ResponseErrorHelper<String>(e.getMessage(),false));
			// TODO: handle exception
		}

	}
	
}
