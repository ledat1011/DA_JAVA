package com.backend.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "image")
public class image {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, columnDefinition = "id")
	private Integer id;
	@JsonProperty("IdPost")
	@Column(name = "IdPost", nullable = false)
	private Integer IdPost;
	@Column(name = "img", nullable = false)
	private String img;
	
	@ManyToOne()
	@JoinColumn(name = "IdPost", nullable = false, insertable = false, updatable = false)
	private posts posts;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdPost() {
		return IdPost;
	}

	public void setIdPost(Integer idPost) {
		IdPost = idPost;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

//	public posts getPosts() {
//		return posts;
//	}
//
//	public void setPosts(posts posts) {
//		this.posts = posts;
//	}
	
}
