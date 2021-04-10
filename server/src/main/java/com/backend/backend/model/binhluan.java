package com.backend.backend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "binhluan")
public class binhluan {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private int id;
	@Column(name = "idUser")
	private Integer idUser;
	
	@Column(name = "idPost")
	private Integer idPost; 
	
	@Column(name = "NoiDung")
	private String NoiDung;
	
	@JsonProperty("Created_at")
	@Column(name = "Created_at")
	private Date Created_at;
	
	@JsonProperty("Update_at")
	@Column(name = "Update_at")
	private Date Update_at;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer getIdUser() {
		return idUser;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}

	public Integer getIdPost() {
		return idPost;
	}

	public void setIdPost(Integer idPost) {
		this.idPost = idPost;
	}
	@JsonProperty("NoiDung")
	public String getNoiDung() {
		return NoiDung;
	}

	public void setNoiDung(String noiDung) {
		NoiDung = noiDung;
	}

	public Date getCreated_at() {
		return Created_at;
	}

	public void setCreate_at(Date created_at) {
		Created_at = created_at;
	}

	public Date getUpdate_at() {
		return Update_at;
	}

	public void setUpdate_at(Date update_at) {
		Update_at = update_at;
	}
	
	

}
