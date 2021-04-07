package com.backend.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="province")
public class province {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private int id;
	
	@Column(name = "_name")
	private String _name;
	
	@Column(name="_code")
	private String _code;
	
	@Column(name="_hot")
	private Boolean _hot;
	
	@Column(name="_image")
	private String _image;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String get_name() {
		return _name;
	}

	public void set_name(String _name) {
		this._name = _name;
	}

	public String get_code() {
		return _code;
	}

	public void set_code(String _code) {
		this._code = _code;
	}

	public Boolean get_hot() {
		return _hot;
	}

	public void set_hot(Boolean _hot) {
		this._hot = _hot;
	}

	public String get_image() {
		return _image;
	}

	public void set_image(String _image) {
		this._image = _image;
	}
}
