package com.backend.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "newbie")
public class newbie {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO )
	@Column(name = "Id", nullable = false, columnDefinition = "Id")
	private int id;
	
	@Column(name = "first_name", nullable = false,columnDefinition = "First_name")

	private String First_name;
	
//	@Column(name = "Last_name", nullable = false, columnDefinition = "Last_name")
	private String Last_name;
	
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirst_name() {
		return First_name;
	}

	public void setFirst_name(String first_name) {
		First_name = first_name;
	}

	public String getLast_name() {
		return Last_name;
	}

	public void setLast_name(String last_name) {
		Last_name = last_name;
	}


}
