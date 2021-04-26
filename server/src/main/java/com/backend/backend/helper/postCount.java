package com.backend.backend.helper;

import javax.persistence.Entity;

import com.backend.backend.model.province;

@Entity
public class postCount extends province{
	private int postCounts;

	public int getPostCounts() {
		return postCounts;
	}

	public void setPostCounts(int postCounts) {
		this.postCounts = postCounts;
	}
	
}