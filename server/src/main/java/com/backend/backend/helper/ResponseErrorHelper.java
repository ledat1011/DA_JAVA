package com.backend.backend.helper;

import java.util.List;

public class ResponseErrorHelper<K> {
	private K error;
	private boolean status ;
	public ResponseErrorHelper(K error, boolean status) {
		super();
		this.error = error;
		this.status = status;
	}
	public K getError() {
		return error;
	}
	public void setError(K error) {
		this.error = error;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
}
