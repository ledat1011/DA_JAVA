package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.province;
@Repository
public interface ProvinceRepository  extends JpaRepository<province, Long> {
	

}
