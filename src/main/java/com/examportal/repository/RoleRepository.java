package com.examportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examportal.entity.Role;

public interface RoleRepository extends JpaRepository<Role,Long> {

}
