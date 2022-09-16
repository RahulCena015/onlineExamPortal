package com.examportal.service;

import java.util.Set;

import com.examportal.entity.User;
import com.examportal.entity.UserRole;

public interface UserService {
	
	//CREATING USER
	public User createUser(User user,Set<UserRole> userRoles) throws Exception;
	//GET USER BY USERNAME
	public User getuser(String username);
	//DELETE USER BY ID
	public void deleteUser(Long userId);
	

}
