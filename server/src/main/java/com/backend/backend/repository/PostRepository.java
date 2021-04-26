package com.backend.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.posts;
import com.backend.backend.model.users;

@Repository
public interface PostRepository extends   JpaRepository<posts, Long> {
	
	@Query("SELECT p FROM posts p WHERE p.idProvince=?1 AND p.TrangThaiDatCoc =false AND p.status = true ")
	List<posts> findByidProvince(int id);
	
	List<posts> findByIdUser(int id);
	@Query(value = "SELECT * FROM posts :query ",nativeQuery = true)
	List<posts> search( @Param("query") String query);
}
