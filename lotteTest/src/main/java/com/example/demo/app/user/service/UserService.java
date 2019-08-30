package com.example.demo.app.user.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.app.user.vo.UserListVO;
import com.example.demo.app.user.vo.UserVO;

public interface UserService extends UserDetailsService{
	public List<UserVO> selectUserList();
	public List<UserListVO> selectUserListVO();
    public UserVO readUser(String username);
    Collection<GrantedAuthority> getAuthorities(String username);
    public void createUser(UserVO user);
    public void deleteUser(String username);
    public PasswordEncoder passwordEncoder();
    public int updateUser(UserVO userVO);
    public UserVO selectUserInfo(String username);
}
