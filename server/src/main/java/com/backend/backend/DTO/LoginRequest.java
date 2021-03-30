package com.backend.backend.DTO;

public class LoginRequest {
	private String email;
	private String password;

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
	public LoginRequest(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * @param password the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
}
