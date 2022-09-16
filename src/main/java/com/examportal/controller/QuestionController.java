package com.examportal.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examportal.entity.exam.Question;
import com.examportal.entity.exam.Quiz;
import com.examportal.service.QuestionService;
import com.examportal.service.QuizService;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {
	
	@Autowired
	private QuestionService service;
	
	@Autowired
	private QuizService quizService;
	
	//ADD QUESTION
	@PostMapping("/")
	public Question add(@RequestBody Question question){
		return this.service.addQuestion(question);
	}
	
	//UPDATE QUESTION
	public ResponseEntity<Question> update(@RequestBody Question question){
		return ResponseEntity.ok(this.service.updateQuestion(question));
	}

	
	//GET ALL QUESTION OF ANY QUIZ
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid){
//		Quiz quiz=new Quiz();
//		quiz.setqId(qid);
//		Set<Question> questionOfQuiz=this.service.getQuestionOfQuiz(quiz);
//		return ResponseEntity.ok(questionOfQuiz);
		
		Quiz quiz= this.quizService.getQuiz(qid);
		Set<Question> questions= quiz.getQuestions();
		
		List<Question> list=new ArrayList<>(questions);
		if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions()))
		{
			list=list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()+1));
		}
		
		list.forEach((q)->{
			q.setAnswer("");
		});
		
		Collections.shuffle(list);
		return ResponseEntity.ok(list);
	
	}
	
	//GET ALL QUESTION OF ANY QUIZ
		@GetMapping("/quiz/all/{qid}")
		public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid){
			Quiz quiz=new Quiz();
			quiz.setqId(qid);
			Set<Question> questionOfQuiz=this.service.getQuestionOfQuiz(quiz);
			return ResponseEntity.ok(questionOfQuiz);
		}
	
	
	//GET SINGLE QUESTION
	@GetMapping("/{quesId}")
	public Question get(@PathVariable("quesId") Long quesId)
	{
		return this.service.getQuestion(quesId);
	}
	
	//DELETE QUESTION
	@DeleteMapping("/{quesId}")
	public void delete(@PathVariable("quesId") Long quesId) {
		this.service.deleteQuestion(quesId);
	}
	
	
	
	//EVALUATE QUIZ MARKS
	
	@PostMapping("/eval-quiz")
	public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
		System.out.println(questions);
		
		  double marksGot=0;
		  int correctAnswers=0;
		  int attempted=0;
		  
		for(Question q:questions){
			
			//single questions
			Question question= this.service.get(q.getQuesId());
			if(question.getAnswer().equals(q.getGivenAnswer()))
			{
				//CORRECT
				correctAnswers++;
				
				double marksSingle=Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
				marksGot += marksSingle;
			}
			
			if(q.getGivenAnswer()!=null) {
				attempted++;
			}
		}
		
		Map<String,Object> map=Map.of("marksGot",marksGot,"correctAnswers",correctAnswers,"attempted",attempted);
		return ResponseEntity.ok(map);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
