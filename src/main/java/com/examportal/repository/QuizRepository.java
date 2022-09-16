package com.examportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examportal.entity.exam.Category;
import com.examportal.entity.exam.Quiz;

public interface QuizRepository extends JpaRepository<Quiz,Long> {
	
	public List<Quiz> findBycategory(Category category);
	
	//THIS API WILL BE USED FOR USER IN FRONTEND
	public List<Quiz> findByActive(Boolean b);
	
	//THIS API WILL BE USED FOR USER IN FRONTEND
	public List<Quiz> findByCategoryAndActive(Category c,Boolean b);

}
