package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.binhluan;

@Repository
public interface BinhLuanRepository extends JpaRepository<binhluan, Long> {

}
