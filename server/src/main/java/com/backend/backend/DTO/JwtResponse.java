package com.backend.backend.DTO;

import java.util.List;

import com.backend.backend.model.savepost;
import com.backend.backend.model.users;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
//	private int id;
//	private String email;
//	private String password;
//	private String first_name;
//	private String last_name;
//	private List<String> roles;
	private users user;
	private List<savepost> wish_list;
	private Boolean status;

//	public JwtResponse(String accessToken, int id, String email, String password, List<String> roles) {
//		this.token = accessToken;
//		this.id = id;
//		this.password = password;
//		this.email = email;
//		this.roles = roles;
//	}
//	public JwtResponse(String accessToken, int id,String first_name, String last_name, String email, String password, List<String> roles) {
//		this.token = accessToken;
//		this.id = id;
//		this.password = password;
//		this.email = email;
//		this.roles = roles;
//		this.first_name = first_name;
//		this.last_name = last_name;
//	}



	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	//	public String getFirst_name() {
//		return first_name;
//	}
//	public void setFirst_name(String first_name) {
//		this.first_name = first_name;
//	}
//	public String getLast_name() {
//		return last_name;
//	}
//	public void setLast_name(String last_name) {
//		this.last_name = last_name;
//	}
	public String getAccessToken() {
		return token;
	}

	public List<savepost> getWish_list() {
		return wish_list;
	}

	public users getUser() {
		return user;
	}

	public void setUser(users user) {
		this.user = user;
	}

	public JwtResponse(String token, users user, List<savepost> savepost) {
		super();
		this.token = token;
		this.user = user;
		this.wish_list= savepost;
	}
	public JwtResponse(String token, users user, List<savepost> savepost, Boolean status) {
		super();
		this.token = token;
		this.user = user;
		this.wish_list= savepost;
		this.status = status;
	}
	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//
//	public List<String> getRoles() {
//		return roles;
//	}
}
