package com.backend.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.backend.model.district;
import com.backend.backend.model.province;

public interface DistrictRepository extends JpaRepository<district, Long> {
	
	@Query(value = "SELECT * FROM district WHERE _province_id = ?1 ", nativeQuery = true)
	List<district> getByIdProvince(int id);
}
