package com.backend.backend.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "loaitienich")
public class loaitienich {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private int id;
	
	@Column(name = "TenLoaiTienIch")
	private String TenLoaiTienIch;
	 @OneToMany(mappedBy = "loaitienich",fetch = FetchType.LAZY)
	  private List<tienich> tienich;
	@JsonProperty("TenLoaiTienIch")
	
	public String getTenLoaiTienIch() {
		return TenLoaiTienIch;
	}
	
	    
	public void setTenLoaiTienIch(String tenLoaiTienIch) {
		TenLoaiTienIch = tenLoaiTienIch;
	}

	public int getId() {
		return id;
	}
	
	
}
