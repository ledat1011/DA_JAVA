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

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "users")
@JsonAutoDetect(fieldVisibility=JsonAutoDetect.Visibility.ANY, getterVisibility=JsonAutoDetect.Visibility.NONE,
setterVisibility=JsonAutoDetect.Visibility.NONE, creatorVisibility=JsonAutoDetect.Visibility.NONE)
public class users {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, columnDefinition = "Id")
	private int id;

	@JsonProperty("First_name")
	@Column(name = "First_name")
	private String First_name;

	@Column(name = "Last_name")
	@JsonProperty("Last_name")
	private String Last_name;

	@Column(name = "PhoneNumber")
	@JsonProperty("PhoneNumber")
	private BigInteger PhoneNumber;
	@JsonProperty("Email")
	@Column(name = "Email")
	private String email;

	@JsonProperty("PassWord")
	@Column(name = "PassWord")
	private String PassWord;

	@Column(name = "Money")
	@JsonProperty("Money")
	private Double Money;

	@Column(name = "block")
	private boolean block;

	@Column(name = "Created_at")
	@JsonProperty("Created_at")
	private Date created_at;

	@Column(name = "Update_at")
	@JsonProperty("Update_at")
	private Date Update_at;
	@JsonProperty("ConfirmEmaiil")
	@Column(name = "ConfirmEmaiil")
	private Boolean ConfirmEmaiil;

	@ManyToOne()
	@JoinColumn(name = "Id_LoaiDangNhap", nullable = false, insertable = false, updatable = false)
	private loaidangnhap loaidangnhap;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<roles> roles = new HashSet<>();
	@Column(name = "Id_LoaiDangNhap")
	private int Id_LoaiDangNhap;

	
	
	
	
	 public users() {
		
	}
	 public users(users user) {
		 First_name = user.First_name;
			Last_name = user.Last_name;
			PhoneNumber = user.PhoneNumber;
			this.email = user.email;
			PassWord = user.PassWord;
			Money = user.Money;
			this.block = user.block;
			this.created_at = user.created_at;
			Update_at = user.Update_at;
			ConfirmEmaiil = user.ConfirmEmaiil;
			Id_LoaiDangNhap = user.Id_LoaiDangNhap;
	}
	public users(String first_name, String last_name, BigInteger phoneNumber, String email, String passWord,
			Double money, boolean block, Date created_at, Date update_at, Boolean confirmEmaiil, int id_LoaiDangNhap) {
		super();
		First_name = first_name;
		Last_name = last_name;
		PhoneNumber = phoneNumber;
		this.email = email;
		PassWord = passWord;
		Money = money;
		this.block = block;
		this.created_at = created_at;
		Update_at = update_at;
		ConfirmEmaiil = confirmEmaiil;
		Id_LoaiDangNhap = id_LoaiDangNhap;
	}

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

	public BigInteger getPhoneNumber() {
		return PhoneNumber;
	}

	public void setPhoneNumber(BigInteger phoneNumber) {
		PhoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassWord() {
		return PassWord;
	}

	public void setPassWord(String passWord) {
		PassWord = passWord;
	}

	public Double getMoney() {
		return Money;
	}

	public void setMoney(Double money) {
		Money = money;
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

	public Date getUpdate_at() {
		return Update_at;
	}

	public void setUpdate_at(Date update_at) {
		Update_at = update_at;
	}

	public Boolean getConfirmEmaiil() {
		return ConfirmEmaiil;
	}

	public void setConfirmEmaiil(Boolean confirmEmaiil) {
		ConfirmEmaiil = confirmEmaiil;
	}

	public loaidangnhap getLoaidangnhap() {
		return loaidangnhap;
	}

	public void setLoaidangnhap(loaidangnhap loaidangnhap) {
		this.loaidangnhap = loaidangnhap;
	}

	public Set<roles> getRoles() {
		return roles;
	}

//	public void setRoles(Set<roles> roles) {
//		this.roles = roles;
//	}
	public int getId_LoaiDangNhap() {
		return Id_LoaiDangNhap;
	}

	public void setId_LoaiDangNhap(int id_LoaiDangNhap) {
		Id_LoaiDangNhap = id_LoaiDangNhap;
	}

}
