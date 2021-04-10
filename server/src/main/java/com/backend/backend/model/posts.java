package com.backend.backend.model;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;
@Entity
@Table(name = "posts")
public class posts {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", nullable = false, columnDefinition = "id")
	private Integer id;
	@Column(name = "idUser", nullable = false)
	private int idUser;
	
	@Column(name = "idProvince")
	private int idProvince;
	
	@Column(name = "idDistrict")
	private int idDistrict;
	
	@Column(name = "idStreet")
	private Integer idStreet;
	
	@Column(name = "idWard")
	private int idWard;
	
	@Column(name = "numberAddress")
	private String numberAddress;
	
	@Column(name = "price")
	private Double price;
	
	@Column(name = "idDoiTuong")
	private Integer idDoiTuong;
	
	@Column(name = "Dientich")
	private Integer Dientich;
	
	@Column(name = "soLuongTruyCap")
	private Integer soLuongTruyCap;
	
	@Column(name = "tienDatCoc")
	private BigInteger tienDatCoc;
	
	@Column(name = "TrangThaiDatCoc")
	private Boolean TrangThaiDatCoc;
	
	@Column(name = "DiaChi")
	private String DiaChi;
	
	@Column(name = "minPrice")
	private BigInteger minPrice;
	
	@Column(name = "maxPrice")
	private BigInteger maxPrice;
	
	@Column(name = "selectedRuleParty")
	private String selectedRuleParty;
	
	@Column(name = "selectedRuleSmoke")
	private String selectedRuleSmoke;
	
	@Column(name = "selectedRulePet")
	private String selectedRulePet;
	
	@Column(name = "addRule")
	private String addRule;
	
	@Column(name = "introduction")
	private String introduction;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "idTypePost")
	private Integer idTypePost;
	
	@Column(name = "idFormPost")
	private Integer idFormPost;
	
	@Column(name = "roomNumber")
	private Integer roomNumber;
	
	@Column(name = "bathroomNuber")
	private Integer bathroomNuber;
	
	@Column(name = "kitchenNumber")
	private Integer kitchenNumber;
	
	@Column(name = "avatar")
	private String avatar;
	
	@Column(name = "confirm")
	private Boolean confirm;
	
	@Column(name = "status")
	private Boolean status;
	
	@Column(name = "Created_at")
	private Date Created_at;
	
	@Column(name = "Update_at")
	private Date Update_at;
	
	@Column(name = "lat")
	private Double lat;
	
	@Column(name = "lng")
	private Double lng;
	
    @OneToMany(mappedBy = "posts",fetch = FetchType.LAZY)
    private List<image> images;
    
    @ManyToOne()
	@JoinColumn(name = "idFormPost", nullable = false, insertable = false, updatable = false)
	private formpost formpost;
    
    @ManyToOne()
	@JoinColumn(name = "idTypePost", nullable = false, insertable = false, updatable = false)
	private typepost typepost;
    
	public typepost getTypepost() {
		return typepost;
	}

	public formpost getFormpost() {
		return formpost;
	}

	public void setFormpost(formpost formpost) {
		this.formpost = formpost;
	}

	public List<image> getImages() {
		return images;
	}

	public void setImages(List<image> images) {
		this.images = images;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getIdUser() {
		return idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public int getIdProvince() {
		return idProvince;
	}

	public void setIdProvince(int idProvince) {
		this.idProvince = idProvince;
	}

	public int getIdDistrict() {
		return idDistrict;
	}

	public void setIdDistrict(int idDistrict) {
		this.idDistrict = idDistrict;
	}

	public Integer getIdStreet() {
		return idStreet;
	}

	public void setIdStreet(Integer idStreet) {
		this.idStreet = idStreet;
	}

	public int getIdWard() {
		return idWard;
	}

	public void setIdWard(int idWard) {
		this.idWard = idWard;
	}

	public String getNumberAddress() {
		return numberAddress;
	}

	public void setNumberAddress(String numberAddress) {
		this.numberAddress = numberAddress;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getIdDoiTuong() {
		return idDoiTuong;
	}

	public void setIdDoiTuong(Integer idDoiTuong) {
		this.idDoiTuong = idDoiTuong;
	}
	@JsonProperty("Dientich")
	public Integer getDientich() {
		return Dientich;
	}

	public void setDientich(Integer dientich) {
		Dientich = dientich;
	}

	public Integer getSoLuongTruyCap() {
		return soLuongTruyCap;
	}

	public void setSoLuongTruyCap(Integer soLuongTruyCap) {
		this.soLuongTruyCap = soLuongTruyCap;
	}

	public BigInteger getTienDatCoc() {
		return tienDatCoc;
	}

	public void setTienDatCoc(BigInteger tienDatCoc) {
		this.tienDatCoc = tienDatCoc;
	}

	public Boolean getTrangThaiDatCoc() {
		return TrangThaiDatCoc;
	}

	public void setTrangThaiDatCoc(Boolean trangThaiDatCoc) {
		TrangThaiDatCoc = trangThaiDatCoc;
	}
	@JsonProperty("DiaChi")
	public String getDiaChi() {
		return DiaChi;
	}

	public void setDiaChi(String diaChi) {
		DiaChi = diaChi;
	}

	public BigInteger getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(BigInteger minPrice) {
		this.minPrice = minPrice;
	}

	public BigInteger getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(BigInteger maxPrice) {
		this.maxPrice = maxPrice;
	}

	public String getSelectedRuleParty() {
		return selectedRuleParty;
	}

	public void setSelectedRuleParty(String selectedRuleParty) {
		this.selectedRuleParty = selectedRuleParty;
	}

	public String getSelectedRuleSmoke() {
		return selectedRuleSmoke;
	}

	public void setSelectedRuleSmoke(String selectedRuleSmoke) {
		this.selectedRuleSmoke = selectedRuleSmoke;
	}

	public String getSelectedRulePet() {
		return selectedRulePet;
	}

	public void setSelectedRulePet(String selectedRulePet) {
		this.selectedRulePet = selectedRulePet;
	}

	public String getAddRule() {
		return addRule;
	}

	public void setAddRule(String addRule) {
		this.addRule = addRule;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getIdTypePost() {
		return idTypePost;
	}

	public void setIdTypePost(Integer idTypePost) {
		this.idTypePost = idTypePost;
	}

	public Integer getIdFormPost() {
		return idFormPost;
	}

	public void setIdFormPost(Integer idFormPost) {
		this.idFormPost = idFormPost;
	}

	public Integer getRoomNumber() {
		return roomNumber;
	}

	public void setRoomNumber(Integer roomNumber) {
		this.roomNumber = roomNumber;
	}

	public Integer getBathroomNuber() {
		return bathroomNuber;
	}

	public void setBathroomNuber(Integer bathroomNuber) {
		this.bathroomNuber = bathroomNuber;
	}

	public Integer getKitchenNumber() {
		return kitchenNumber;
	}

	public void setKitchenNumber(Integer kitchenNumber) {
		this.kitchenNumber = kitchenNumber;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Boolean getConfirm() {
		return confirm;
	}

	public void setConfirm(Boolean confirm) {
		this.confirm = confirm;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	@JsonProperty("Created_at")
	public Date getCreated_at() {
		return Created_at;
	}

	public void setCreated_at(Date created_at) {
		Created_at = created_at;
	}
	@JsonProperty("Update_at")
	public Date getUpdate_at() {
		return Update_at;
	}

	public void setUpdate_at(Date update_at) {
		Update_at = update_at;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	
	
//	privae

}
