package com.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.backend.backend.helper.CustomUserDetails;
import com.backend.backend.model.users;
import com.backend.backend.repository.UserRepository;

public class UserService implements UserDetailsService  {
	@Autowired
    private UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String Email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		users user=userRepository.findByEmail(Email);
		if (user == null) {
            throw new UsernameNotFoundException(Email);
        }
        return new CustomUserDetails(user);
	}

}
