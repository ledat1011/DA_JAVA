package com.backend.backend.helper;

import java.util.List;

public class ResponseSuccessHelper<K> {
	
	private K data;
	private boolean status ;
	public ResponseSuccessHelper(K data, boolean status) {
		super();
		this.data = data;
		this.status = status;
	}
	public K getData() {
		return data;
	}
	public void setData(K data) {
		this.data = data;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	
	
	
	
}
