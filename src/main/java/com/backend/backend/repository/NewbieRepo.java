package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend.model.newbie;
import com.backend.backend.model.users;

public interface NewbieRepo extends JpaRepository<newbie, Long> {

}
