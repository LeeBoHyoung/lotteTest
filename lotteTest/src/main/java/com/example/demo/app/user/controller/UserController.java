package com.example.demo.app.user.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.app.user.service.UserService;
import com.example.demo.app.user.vo.UserVO;
import com.example.demo.project.vo.TaskVO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

@Controller
public class UserController {
	
	@Autowired
    UserService userService;
	
	/*@RequestMapping("/user/signin")
	public String login(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		if(!principal.equals("anonymousUser")) {
			return "forward:/project/";
		}
		else {
			return "redirect:signin2";
		}
	}*/
	
	@RequestMapping("/user/signin")
	public ModelAndView signup2(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {

		ModelAndView mav = new ModelAndView("app/signin");
		return mav;
	}
	
	@RequestMapping("/user/signup")
	public ModelAndView signup(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {

		List<UserVO> userList = userService.selectUserList();
		String userListJSON = new ObjectMapper().writeValueAsString(userList);
		model.addAttribute("userList", userListJSON);
		
		ModelAndView mav = new ModelAndView("app/signup");
		return mav;
	}
	

	@RequestMapping(value="/user/signupAction", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String signup(HttpServletRequest request, HttpServletResponse response, UserVO userVO) throws Exception{
		userVO.setAccountNonExpired(true);
		userVO.setAccountNonLocked(true);
		userVO.setCredentialsNonExpired(true);
		userVO.setEnabled(true);
		userVO.setAuthorities(AuthorityUtils.createAuthorityList("USER"));
		
		String result = "false";
		try {
		userService.createUser(userVO);
		result = "true";
		}catch (Exception e) {
			System.out.println("insert user exception");
		} finally {
			System.out.println("INSERT 완료");
		}
		
		return result;
	}
	
	@RequestMapping(value="/user/updateUserAction", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String updateUserAction(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			UserVO userVO) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userInfo = (UserVO)principal; 
		String result = "false";
		System.out.println(userVO.getEmail());
		System.out.println(userVO.getUsername());
		//userVO.setUsername(userInfo.getUsername());
		try {
			int resultUpdate = userService.updateUser(userVO);
			result = "true";
		} catch (Exception e) {
			System.out.println("update user exception");
		} finally {
			System.out.println("UPDATE 완료");
		}

		return result;
	}
}
