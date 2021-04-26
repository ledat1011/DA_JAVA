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
@Table(name ="tienich")
public class tienich {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private int id;
	
	@Column(name = "idLoaiTienIch")
	private int idLoaiTienIch;
	
	@Column(name = "TenTienIch")
	private String TenTienIch;

	
	@ManyToOne()
	@JoinColumn(name = "idLoaiTienIch", nullable = false, insertable = false, updatable = false)
	private loaitienich loaitienich;
	
	
	public loaitienich getLoaitienich() {
		return loaitienich;
	}

	public int getId() {
		return id;
	}

	public int getIdLoaiTienIch() {
		return idLoaiTienIch;
	}

	public void setIdLoaiTienIch(int idLoaiTienIch) {
		this.idLoaiTienIch = idLoaiTienIch;
	}
	
	@JsonProperty("TenTienIch")
	public String getTenTienIch() {
		return TenTienIch;
	}

	public void setTenTienIch(String tenTienIch) {
		TenTienIch = tenTienIch;
	}
	
}
