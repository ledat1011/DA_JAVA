package com.backend.backend.DTO;

public class GetToken {
	private String token;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public GetToken(String token) {
		super();
		this.token = token;
	}

	public GetToken() {
		super();
	}
	
}
