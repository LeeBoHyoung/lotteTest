package com.example.demo.app.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.app.user.mapper.UserMapper;
import com.example.demo.app.user.service.UserService;
import com.example.demo.app.user.vo.UserListVO;
import com.example.demo.app.user.vo.UserVO;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired 
	UserMapper userMapper;
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         UserVO user = userMapper.readUser(username);
         user.setAuthorities(getAuthorities(username));
        
         return user;
    }
   
	public Collection<GrantedAuthority> getAuthorities(String username) {
        List<String> string_authorities = userMapper.readAuthority(username);
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (String authority : string_authorities) {
             authorities.add(new SimpleGrantedAuthority(authority));
        }
        return authorities;
   }
   
    @Override
    public UserVO readUser(String username) {
         UserVO user = userMapper.readUser(username);
         List<String> string_authorities = userMapper.readAuthority(username);
         List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
         for (String authority : string_authorities) {
              authorities.add(new SimpleGrantedAuthority(authority));
         }
         user.setAuthorities(authorities);
         return user;
    }

    @Override
    public void createUser(UserVO user) {
         String rawPassword = user.getPassword();
         String encodedPassword = new BCryptPasswordEncoder().encode(rawPassword);
         user.setPassword(encodedPassword);
         userMapper.createUser(user);
         userMapper.createAuthority(user);
    }

    @Override
    public void deleteUser(String username) {
         userMapper.deleteUser(username);
         userMapper.deleteAuthority(username);
    }


    @Override
    public PasswordEncoder passwordEncoder() {
         return this.passwordEncoder;
    }
    
    @Override
    public List<UserVO> selectUserList(){
    	return userMapper.selectUserList();
    }
    
    @Override
    public List<UserListVO> selectUserListVO(){
    	return userMapper.selectUserListVO();
    }
    
    @Override
    public int updateUser(UserVO userVO) {
    	System.out.println("inin???");
    	return userMapper.updateUser(userVO);
    }
    
    @Override
    public UserVO selectUserInfo(String username) {
    	return userMapper.selectUserInfo(username);
    }
}
