package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.model.street;

public interface StreetRepository extends JpaRepository<street, Long> {

}
