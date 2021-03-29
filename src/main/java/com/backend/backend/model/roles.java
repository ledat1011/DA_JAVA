package com.backend.backend.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



@Entity
@Table(name = "roles")
public class roles {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, columnDefinition = "id")
	private int id;

	@Column(name = "name_roles")
	private String name_roles;

	@Column(name = "Description")
	private String Description;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName_roles() {
		return name_roles;
	}

	public void setName_roles(String name_roles) {
		this.name_roles = name_roles;
	}

	public String getDescription() {
		return Description;
	}

	public void setdescription(String description) {
		Description = description;
	}
//    @OneToMany(mappedBy = "roles",fetch = FetchType.LAZY)
//    private List<users> users;




	  
}
