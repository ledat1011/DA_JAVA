package com.backend.backend.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.helper.postCount;
import com.backend.backend.model.province;
@Repository
public interface ProvinceRepository  extends JpaRepository<province, Long> {
	
//	@Query("SELECT province.id, province._name, province._code, province._hot, province._image FROM province AS province LEFT OUTER JOIN posts AS posts ON province.id = posts.idProvince AND posts.status = true AND posts.confirm = true AND posts.TrangThaiDatCoc = false GROUP BY province.id")
	@Query(value =  "SELECT province.id, province._name, province._code, province._hot, province._image, COUNT(posts.id) AS postCounts FROM province AS province LEFT OUTER JOIN posts AS posts ON province.id = posts.idProvince AND posts.status = true AND posts.confirm = true AND posts.TrangThaiDatCoc = false GROUP BY province.id;", nativeQuery = true)
	List<postCount> provinces();
}
