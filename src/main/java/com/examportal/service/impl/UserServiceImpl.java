package com.examportal.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examportal.entity.User;
import com.examportal.entity.UserRole;
import com.examportal.helper.UserFoundException;
import com.examportal.repository.RoleRepository;
import com.examportal.repository.UserRepository;
import com.examportal.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	//CREATING USER
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		
		User local=this.userRepository.findByUsername(user.getUsername());
		if(local!=null)
		{
			System.out.println("This User is already available");
			throw new UserFoundException();
		}
		else
		{
			//USER CREATE
			for(UserRole ur:userRoles)
			{
				roleRepository.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local=this.userRepository.save(user);
		}
		return local;
	}

	//GET USER BY USERNAME
	@Override
	public User getuser(String username) {
		
		return this.userRepository.findByUsername(username);
	}

	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
		
	}

}
