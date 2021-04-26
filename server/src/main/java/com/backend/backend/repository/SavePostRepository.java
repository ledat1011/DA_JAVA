package com.backend.backend.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.savepost;

@Repository
public interface SavePostRepository extends JpaRepository<savepost, Long> { 
	List<savepost> findByIdUser(int IdUser);
	
	@Transactional
	@Modifying
	@Query(value = "DELETE FROM savepost WHERE IdUser =?1 AND IdPost =?2", nativeQuery = true)
	Integer delete(int idUser, int idPost);
}
