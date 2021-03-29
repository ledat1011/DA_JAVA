package com.backend.backend.model;

import java.math.BigInteger;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class users {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO )
	@Column(name = "id", nullable = false, columnDefinition = "Id")
	private int id;
	
	@Column(name = "first_name")
	private String first_name;
	
	@Column(name = "last_name")
	private String last_name;
	
	@Column(name = "phonenumber")
	private BigInteger phonenumber;
	
	@Column(name ="email")
	private String email;
	
	@Column(name = "password")
	private String password;
	
	@Column(name= "money")
	private Double money;
	
	@Column(name ="block")
	private boolean block;
	
	@Column(name =  "created_at")
	private Date created_at;
	@ManyToOne()
	@JoinColumn(name = "id_LoaiDangNhap", nullable = false)
	private loaidangnhap loaidangnhap;
	
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name ="user_roles",joinColumns = @JoinColumn(name ="user_id")
	,inverseJoinColumns = @JoinColumn(name="role_id"))
	private Set<roles> roles = new HashSet<>();
	
	public Set<roles> getRoles() {
		return roles;
	}
	public void setRoles(Set<roles> roles) {
		this.roles = roles;
	}
	public int getid() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public BigInteger getPhonenumber() {
		return phonenumber;
	}
	public void setPhonenumber(BigInteger phonenumber) {
		this.phonenumber = phonenumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmaill(String emaill) {
		this.email = emaill;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Double getMoney() {
		return money;
	}
	public void setMoney(Double money) {
		this.money = money;
	}
	public boolean isBlock() {
		return block;
	}
	public void setBlock(boolean block) {
		this.block = block;
	}
	public Date getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}
	public loaidangnhap getLoaidangnhap() {
		return loaidangnhap;
	}
//	public void setLoaidangnhap(loaidangnhap loaidangnhap) {
//		this.loaidangnhap = loaidangnhap;
//	}

}
