package com.examportal.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.entity.Role;
import com.examportal.entity.User;
import com.examportal.entity.UserRole;
import com.examportal.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	//CREATING USER
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception
	{
		user.setProfile("default.png");
		
		//ENCODING PASSWORD WITH Bcryptpasswardencoder
		
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole> roles=new HashSet<>();
		Role role=new Role();
		role.setRoleId(45L);
		role.setRoleName("Normal");
		
		UserRole userRole=new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		
		return this.userService.createUser(user,roles);
	}
	
	//GET USER BY USERNAME
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username)
	{
		return this.userService.getuser(username);
	}
	
	
	//DELETE USER BY ID
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId") Long userId)
	{
		this.userService.deleteUser(userId);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
