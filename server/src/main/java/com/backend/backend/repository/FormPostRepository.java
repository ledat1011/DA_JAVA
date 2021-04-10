package com.backend.backend.repository;

import javax.persistence.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.district;
import com.backend.backend.model.formpost;

@Repository
public interface FormPostRepository extends JpaRepository<formpost, Long> {

}
