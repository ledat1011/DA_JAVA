package com.backend.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.backend.model.district;
import com.backend.backend.model.ward;

public interface WardRepository  extends JpaRepository<ward, Long> {
	@Query(value = "SELECT id, _name, _prefix, _province_id, _district_id FROM ward AS ward WHERE ward._province_id = ?1 AND ward._district_id = ?2",nativeQuery = true)
	List<ward> getWard(int _province_id,int _district_id  );
}
