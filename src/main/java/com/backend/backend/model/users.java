package com.backend.backend.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.GenerationType;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class users {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO )
	@Column(name = "Id", nullable = false, columnDefinition = "Id")
	private int Id;
	
	@Column(name = "First_name")
	private String First_name;
	
	@Column(name = "Last_name")
	private String Last_name;
	
	@Column(name = "PhoneNumber")
	private Integer PhoneNumber;
	
	@Column(name ="Email")
	private String Emaill;
	
	@Column(name = "PassWord")
	private String PassWord;
	
	@Column(name= "Money")
	private Double Money;
	
	@Column(name ="block")
	private boolean block;
	
	@Column(name =  "Created_at")
	private Date Created_at;

	public int getId() {
		return Id;
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

	public Integer getPhoneNumber() {
		return PhoneNumber;
	}

	public void setPhoneNumber(Integer phoneNumber) {
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
	






	
	
}
