package com.backend.backend.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class ResourceNotFoundException extends Exception {

	private static final long serialVersionID = 1L;
	
	public ResourceNotFoundException( String message) {
		// TODO Auto-generated constructor stub
		super(message);
	}
}
