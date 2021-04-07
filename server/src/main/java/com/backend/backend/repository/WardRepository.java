package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.model.district;
import com.backend.backend.model.ward;

public interface WardRepository  extends JpaRepository<ward, Long> {

}
