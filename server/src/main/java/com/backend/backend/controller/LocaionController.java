package com.backend.backend.controller;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.repository.DistrictRepository;
import com.backend.backend.repository.ProvinceRepository;
import com.backend.backend.repository.WardRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/location")
public class LocaionController {
	@Autowired
	DistrictRepository districtRepo;

	@Autowired
	ProvinceRepository provinceRepo;
	@Autowired
	WardRepository wardRepository;
	@GetMapping("/province")
	public ResponseEntity<?> province() {
		try {

			return ResponseEntity.ok(provinceRepo.provinces());
		} catch (Exception e) {

			return ResponseEntity.ok(e);
			// TODO: handle exception
		}

	}

	@PostMapping("/district")
	public ResponseEntity<?> district(@Validated @RequestBody String req) {
		try {
			JSONObject jsonObject = new JSONObject(req);
			int id = jsonObject.getInt("id");
			return ResponseEntity.ok(districtRepo.getByIdProvince(id));
		} catch (Exception e) {

			return ResponseEntity.ok(e);
			// TODO: handle exception
		}

	}
	@PostMapping("/ward")
	public ResponseEntity<?> ward(@Validated @RequestBody String req) {
		try {
			JSONObject jsonObject = new JSONObject(req);
			int idProvince = jsonObject.getInt("idProvince");
			int idDistrict = jsonObject.getInt("idDistrict");
			return ResponseEntity.ok(wardRepository.getWard(idProvince, idDistrict));
		} catch (Exception e) {

			return ResponseEntity.ok(e);
			// TODO: handle exception
		}

	}

}
