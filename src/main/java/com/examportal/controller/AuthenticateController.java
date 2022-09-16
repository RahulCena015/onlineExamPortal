package com.examportal.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.config.JwtUtils;
import com.examportal.entity.JwtRequest;
import com.examportal.entity.JwtResponse;
import com.examportal.entity.User;
import com.examportal.helper.UserNotFoundException;
import com.examportal.service.impl.UserDetailsServiceImpl;

@RestController
@CrossOrigin("*")
public class AuthenticateController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	
	@Autowired
	private JwtUtils jwtUtils;
	
	
	//GENERATE TOKEN
	@PostMapping("/generate-token")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception
	{
		try {
			authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
			
		}catch (UserNotFoundException e) {
			e.printStackTrace();
			throw new Exception("USER NOT FOUND");
		}
		
		UserDetails userDetails= this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		String token = this.jwtUtils.generateToken(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}
	
	
	
	private void authenticate(String username,String passowrd) throws Exception
	{
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, passowrd));
			
		}catch (DisabledException e) {
			throw new Exception("USER DISABLED"+e.getMessage());
		}catch (BadCredentialsException e) {
			throw new Exception("INVALID CREDENTIALS"+e.getMessage());
		}
	}
	
	//RETURNS THE DETAILS OF CURRENT USER
	
	@GetMapping("/current-user")
	public User getCurrentUser(Principal principal)
	{
		return (User)(this.userDetailsService.loadUserByUsername(principal.getName()));
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
