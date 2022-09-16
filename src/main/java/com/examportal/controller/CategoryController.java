package com.examportal.controller;

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
import com.examportal.service.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
	
	@Autowired
	private CategoryService categoryService;
	
	//ADD CATEGORY
	@PostMapping("/")
	public ResponseEntity<Category> addCategory(@RequestBody Category category){
		Category category1=this.categoryService.addCategory(category);
		return ResponseEntity.ok(category1);
	}
	
	//GET CATEGORY BY ID
	@GetMapping("/{categoryId}")
	public Category getCategory(@PathVariable("categoryId") Long categoryId) {
	      return this.categoryService.getCategory(categoryId);
	}
	
	//GET ALL CATEGORY
	@GetMapping("/")
	public ResponseEntity<?> getCategories(){
		return ResponseEntity.ok(this.categoryService.getCategories());
	}
	
	//UPDATE CATEGORY BY ID
	@PutMapping("/")
	public Category updateCategory(@RequestBody Category category) {
		return this.categoryService.updateCategory(category);
	}
	
	//DELETE CATEGORY
	@DeleteMapping("/{categoryId}")
	public void deleteCategory(@PathVariable("categoryId") Long categoryId) {
		this.categoryService.deleteCategory(categoryId);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	

}
