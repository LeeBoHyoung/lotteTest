package com.example.demo.app.user.mapper;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.demo.app.user.vo.UserListVO;
import com.example.demo.app.user.vo.UserVO;

public interface UserMapper{
     public UserVO readUser(String username);
     public List<String> readAuthority(String username);
     Collection<GrantedAuthority> getAuthorities(String username);
     public void createUser(UserVO user);
     public void createAuthority(UserVO user);
     public void deleteUser(String username);
     public void deleteAuthority(String username);
     public PasswordEncoder passwordEncoder();
     public List<UserVO> selectUserList();
     public List<UserListVO> selectUserListVO();
     public int updateUser(UserVO userVO);
     public UserVO selectUserInfo(String username);
}
