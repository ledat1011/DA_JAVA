package com.backend.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;import com.backend.backend.common.ERole;
import com.backend.backend.model.roles;


@Repository
public interface RoleRepository  extends JpaRepository<roles, Long> {

	Optional<roles> findByname(ERole name);
	
}

