package com.backend.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.model.savepost;


public interface SavePostRepository extends JpaRepository<savepost, Long> { 
	List<savepost> findByIdUser(int IdUser);
}
