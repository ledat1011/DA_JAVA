package com.backend.backend.model;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class users {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "Id", nullable = false, columnDefinition = "Id")
	private int Id;

	@Column(name = "\"First_name\"")
	private String First_name;

	@Column(name = "Last_name")
	private String Last_name;

	@Column(name = "PhoneNumber")
	private BigInteger PhoneNumber;

	@Column(name = "Email")
	private String Emaill;

	@Column(name = "PassWord")
	private String PassWord;

	@Column(name = "Money")
	private Double Money;

	@Column(name = "block")
	private boolean block;

	@Column(name = "Created_at")
	private Date Created_at;

	@ManyToOne
	@JoinColumn(name = "Id_role", nullable = false)
	private roles roles;
	
	@ManyToOne()
	@JoinColumn(name = "Id_LoaiDangNhap", nullable = false)
	private loaidangnhap loaidangnhap;

	public loaidangnhap getLoaidangnhap() {
		return loaidangnhap;
	}

	public void setLoaidangnhap(loaidangnhap loaidangnhap) {
		this.loaidangnhap = loaidangnhap;
	}

	@Column(name = "Id_role", insertable = false, updatable = false)
	private int Id_role;

	public int getId_role() {
		return Id_role;
	}

	public void setId_role(int id_role) {
		Id_role = id_role;
	}

	@Column(name = "Id_LoaiDangNhap", insertable = false, updatable = false)
	private int Id_LoaiDangNhap;

	public int getId() {
		return Id;
	}

	public roles getRoles() {
		return roles;
	}

	public void setRoles(roles roles) {
		this.roles = roles;
	}

	public void setId(int id) {
		Id = id;
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

	public String getEmaill() {
		return Emaill;
	}

	public void setEmaill(String emaill) {
		Emaill = emaill;
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
		return Created_at;
	}

	public void setCreated_at(Date created_at) {
		Created_at = created_at;
	}

	public int getId_LoaiDangNhap() {
		return Id_LoaiDangNhap;
	}

	public void setId_LoaiDangNhap(int id_LoaiDangNhap) {
		Id_LoaiDangNhap = id_LoaiDangNhap;
	}
//	public Boolean getconfirmEmail() {
//		return ConfirmEmail;
//	}
//
//	public void setConfirmEmail(Boolean confirmEmail) {
//		ConfirmEmail = confirmEmail;
//	}
//	private Boolean ConfirmEmail;

}
