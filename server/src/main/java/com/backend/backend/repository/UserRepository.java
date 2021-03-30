package com.backend.backend.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.users;

@Repository
public interface UserRepository  extends JpaRepository<users, Long> {

	Optional<users> findByEmail(String Email);
	
	Boolean existsByEmail(String Email);
	
}
