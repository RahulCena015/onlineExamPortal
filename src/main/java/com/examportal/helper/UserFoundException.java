package com.examportal.helper;

public class UserFoundException extends Exception {
	
	public UserFoundException() {
		super("User with this username is already there..");
	}
	
	public UserFoundException(String msg) {super(msg);}

}
