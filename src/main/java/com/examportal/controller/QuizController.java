package com.examportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.entity.exam.Category;
import com.examportal.entity.exam.Quiz;
import com.examportal.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/quiz")
public class QuizController {
	
	@Autowired
	private QuizService quizService;
	
	//ADD QUIZ
	@PostMapping("/")
	public ResponseEntity<Quiz> add(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizService.addQuiz(quiz));
	}
	
	//UPDATE QUIZ
	@PutMapping("/")
	public ResponseEntity<Quiz> update(@RequestBody Quiz quiz){
		return ResponseEntity.ok(this.quizService.updateQuiz(quiz));
	}
	
	//GET ALL QUIZ
	@GetMapping("/")
	public ResponseEntity<?> quizzes(){
		return ResponseEntity.ok(this.quizService.getQuizzes());
	}
	
	
	//GET SINGLE QUIZ BY ID
	@GetMapping("/{qid}")
	public Quiz quiz(@PathVariable("qid") Long qid) {
		return this.quizService.getQuiz(qid);
	}
	
	//DELETE THE QUIZ BY ID
	@DeleteMapping("/{qid}")
	public void delete(@PathVariable("qid") Long qid) {
		this.quizService.deleteQuiz(qid);
	}
	
	
	//GET QUIZ ON BASIS OF CATEGORY
	@GetMapping("/category/{cid}")
	public List<Quiz> getQuizzesfCategory(@PathVariable("cid") Long cid){
		Category category=new Category();
		category.setCid(cid);
		return this.quizService.getQuizzesOfCategory(category);
	}
	
	
	//GET ACTIVE QUIZZES
	@GetMapping("/active")
	public List<Quiz> getActiveQuizzes(){
		return this.quizService.getActiveQuizzes();
	}
	
	
	
	//GET ACTIVE QUIZZES OF CATEGORY
		@GetMapping("/category/active/{cid}")
		public List<Quiz> getActiveQuizzes(@PathVariable("cid") Long cid){
			Category category=new Category();
			category.setCid(cid);
			return this.quizService.getActiveQuizzesOfCategory(category);
		}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
