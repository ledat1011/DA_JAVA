package com.backend.backend.DTO;

import java.math.BigInteger;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SignUpRequest {

	private String First_name;

	private String Last_name;

	private String Email;

	private String PassWord;
	
	private BigInteger PhoneNumber;

	@JsonProperty("First_name")
	public String getFirst_name() {
		return First_name;
	}

	public void setFirst_name(String first_name) {
		First_name = first_name;
	}
	@JsonProperty("Last_name")
	public String getLast_name() {
		return Last_name;
	}

	public void setLast_name(String last_name) {
		Last_name = last_name;
	}
	@JsonProperty("Email")
	public String getEmail() {
		return Email;
	}

	public void setEmail(String email) {
		Email = email;
	}
	@JsonProperty("PassWord")
	public String getPassWord() {
		return PassWord;
	}

	public void setPassWord(String passWord) {
		PassWord = passWord;
	}
	@JsonProperty("PhoneNumber")
	public BigInteger getPhoneNumber() {
		return PhoneNumber;
	}

	public void setPhoneNumber(BigInteger phoneNumber) {
		PhoneNumber = phoneNumber;
	}
	
	
}
