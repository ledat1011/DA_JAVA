package com.backend.backend.DTO;

public class ErrorResponse {
	private String error;
	private Boolean status;
	public ErrorResponse(String error, Boolean status) {
		super();
		this.error = error;
		this.status = status;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	

}
