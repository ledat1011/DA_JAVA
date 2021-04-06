package com.backend.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.backend.model.posts;

@Repository
public interface PostRepository extends   JpaRepository<posts, Long> {

}
