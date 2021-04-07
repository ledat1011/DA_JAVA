package com.backend.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="district")
public class district {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false)
	private int id;
	
	@Column(name="_name")
	private String _name;
	
	@Column(name="_prefix")
	private String _prefix;
	
	@Column(name="_province_id")
	private int _province_id;

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

	public String get_prefix() {
		return _prefix;
	}

	public void set_prefix(String _prefix) {
		this._prefix = _prefix;
	}

	public int get_province_id() {
		return _province_id;
	}

	public void set_province_id(int _province_id) {
		this._province_id = _province_id;
	}
	
	

}
