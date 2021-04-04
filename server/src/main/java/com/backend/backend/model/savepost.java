package com.backend.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "savepost")
@JsonAutoDetect(fieldVisibility=JsonAutoDetect.Visibility.ANY, getterVisibility=JsonAutoDetect.Visibility.NONE,
setterVisibility=JsonAutoDetect.Visibility.NONE, creatorVisibility=JsonAutoDetect.Visibility.NONE)
public class savepost {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, columnDefinition = "Id")
	private int id;
	
	@Column(name = "IdUser")
	@JsonProperty("IdUser")
	private int idUser;

	@Column(name = "IdPost")
	@JsonProperty("IdPost")
	private int IdPost;

	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		idUser = idUser;
	}

	public int getIdPost() {
		return IdPost;
	}

	public void setIdPost(int idPost) {
		IdPost = idPost;
	}
	
}
