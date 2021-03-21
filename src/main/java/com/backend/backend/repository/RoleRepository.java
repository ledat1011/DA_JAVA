package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.model.roles;
import com.backend.backend.model.users;

public interface RoleRepository extends JpaRepository<roles, Integer> {

}
