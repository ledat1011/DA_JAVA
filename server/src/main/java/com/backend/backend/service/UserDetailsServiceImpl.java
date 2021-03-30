package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.backend.model.users;
import com.backend.backend.repository.UserRepository;


@Service(value = "userService")
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		users users = userRepository.findByEmail(username)
				.orElseThrow(()->new UsernameNotFoundException("User nor fond width Email:" + username));
		
		return UserDetailsImpl.build(users);
	}
	

}
