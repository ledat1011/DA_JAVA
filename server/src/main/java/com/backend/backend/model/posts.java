package com.backend.backend.model;

import java.math.BigInteger;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class posts {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, columnDefinition = "id")
	private Integer id;
	private int idUser;
	
	private int idProvince;
	private int idDistrict;
	private int idStreet;
	private int idWard;
	
	private String numberAddress;
	private Double price;
	private Integer idDoiTuong;
	
	private Integer Dientich;
	private Integer soLuongTruyCap;
	private BigInteger tienDatCoc;
	private Boolean TrangThaiDatCoc;
	private String DiaChi;
	private BigInteger minPrice;
	private BigInteger maxPrice;
	private String selectedRuleParty;
	private String selectedRuleSmoke;
	private String selectedRulePet;
	private String addRule;
	private String introduction;
	private String title;
	
	private Integer idTypePost;
	private Integer idFormPost;
	
	private Integer roomNumber;
	private Integer bathroomNuber;
	
	private Integer kitchenNumber;
	private String avatar;
	
	private Boolean confirm;
	private Boolean status;
	
	private Date Created_at;
	private Date Update_at;
	
	private Double lat;
	private Double lng;
	
	
	
	
	
//	privae
	
}
