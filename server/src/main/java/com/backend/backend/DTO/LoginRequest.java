package com.backend.backend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginRequest {
	@JsonProperty("Email")
	private String Email;
	@JsonProperty("PassWord")
	private String PassWord;

	/**
	 * Create an empty LoginRequest object
	 */
	public LoginRequest() {
	}

	/**
	 * Create a LoginRequest object with full attributes
	 * 
	 * @param username user's user name
	 * @param password
	 */
	public LoginRequest(String Email, String PassWord) {
		this.Email = Email;
		this.PassWord = PassWord;
	}

	
	public String getEmail() {
		return Email;
	}

	public void setEmail(String Email) {
		this.Email = Email;
	}

	/**
	 * @return the password
	 */
	public String getPassWord() {
		return PassWord;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassWord(String PassWord) {
		this.PassWord = PassWord;
	}
	@Override
	public String toString() {
		return this.Email + this.PassWord;
	}
}
