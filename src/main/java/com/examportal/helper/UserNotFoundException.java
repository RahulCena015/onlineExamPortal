package com.examportal.helper;

public class UserNotFoundException extends Exception {
	
	public UserNotFoundException() {
		super("User with this this username not found ");
	}
	
	public UserNotFoundException(String msg) {super(msg);}

}
