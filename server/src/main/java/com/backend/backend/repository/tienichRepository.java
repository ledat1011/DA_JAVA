package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.street;
import com.backend.backend.model.tienich;

@Repository
public interface tienichRepository extends JpaRepository<tienich, Long>  {

}
