package com.backend.backend.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

import com.backend.backend.common.ERole;



@Entity
@Table(name = "roles")
public class roles {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, columnDefinition = "id")
	private int id;
    @Enumerated(EnumType.STRING)
    @NaturalId
	@Column(name = "name")
	private ERole name;

	@Column(name = "Description")
	private String Description;

	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
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
