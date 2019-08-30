package com.example.demo.app.controller;
 
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.algorithm;
import com.example.demo.app.user.service.UserService;
import com.example.demo.app.user.vo.UserVO;
import com.example.demo.project.service.ProjectService;
import com.example.demo.project.vo.TaskVO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

 
@Controller
public class AppController {
	
	@Autowired
	ProjectService projectService;
	@Autowired
	UserService userService;
	
    @RequestMapping("/")
    public String main() throws Exception{
    	//로그인 세션 있을 시 홈페이지로, 아니면 로그인 창으로 설정해야함
       
        return "forward:/project/";
    }
	
    @RequestMapping("/app/mypage")
    public ModelAndView mypage(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
    	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userVO = (UserVO)principal;
		
		
		UserVO userSelectInfo = userService.selectUserInfo(userVO.getUsername());
		String userSelectInfoJSON = new ObjectMapper().writeValueAsString(userSelectInfo);
		model.addAttribute("userSelectInfo", userSelectInfoJSON);
		
		String userInfoJSON = new ObjectMapper().writeValueAsString(userVO);
		model.addAttribute("userInfo", userInfoJSON);
		
		
		
		List<TaskVO> userTaskList = projectService.selecListUserTask(userVO.getUsername());
		
		int max1 = 0;
		int max2 = 0;
		List<Map<String, String>> taskListForJs = new ArrayList<Map<String, String>>();
		String tmpId = "abcd1231233448288382";

		for(int i = 0; i<userTaskList.size();i++) {
			if(!tmpId.equals(userTaskList.get(i).getProjectIdx())) {
				tmpId = userTaskList.get(i).getProjectIdx();
				Map<String, String> tmpObj = new HashMap<String, String>();
				for(int k = 1; k<=14;k++) {
					tmpObj.put(Integer.toString(k)+"d", null);
				}
				tmpObj.put("projectTitle", userTaskList.get(i).getProjectTitle());
				tmpObj.put("name", userTaskList.get(i).getName());
				for(int j = 0;j<userTaskList.size();j++) {
					if(tmpId.equals(userTaskList.get(j).getProjectIdx())) {
						tmpObj.put(userTaskList.get(j).getTaskCategory() + "d", userTaskList.get(j).getImportance());
						max1 = max1 + 1;
						if(max1 > max2) max2 = max1;
					}
				}
				tmpObj.put("max", String.valueOf(max2));
				taskListForJs.add(tmpObj);
				max1 = 0; max2 = 0;
			}
		}
		
		String taskListForJsJSON = new ObjectMapper().writeValueAsString(taskListForJs);
		model.addAttribute("taskListForJs", taskListForJsJSON);
		
		List<Integer> resultp = new ArrayList<Integer>();
		List<String> titleList = new ArrayList<String>();
		List<String> resultMsg = new ArrayList<String>();
		
		for(int i = 0;i<taskListForJs.size();i++) {
			int N = Integer.parseInt(taskListForJs.get(i).get("max").toString());

			int[] taskArray = new int[N+1]; taskArray[0] = 0;
			for(int j = 1;j<=N;j++) {
				taskArray[j] = Integer.parseInt(taskListForJs.get(i).get(String.valueOf(j) +"d").toString());
			}

			List<Integer> plist = new ArrayList<Integer>();
        	ArrayList<ArrayList<Integer>> ptlist = new ArrayList<ArrayList<Integer>>();
        	algorithm.makePlist(plist, ptlist, taskArray);
        	resultp.add(plist.get(N));
        	//System.out.println(plist.get(N));
        	//System.out.println(ptlist.get(N));
        	
        	int[] cnt = new int[N+1];
        	Arrays.fill(cnt, 0);
        	for(int k = 0; k<ptlist.get(N).size();k++) {
        		cnt[ptlist.get(N).get(k)]++;
        	}

        	List<List<Integer>> taskday = new ArrayList<List<Integer>>();
        	for(int k = 1;k<=N;k++) {
        		if(cnt[k] > 0) {
        			List<Integer> tmp = new ArrayList<Integer>();
        			tmp.add(k);
        			tmp.add(cnt[k]*taskArray[k]);
        			taskday.add(tmp);
        		}
        	}

        	
        	String msg = taskListForJs.get(i).get("projectTitle").toString() + "의 작업 최대 효율은 " + String.valueOf(plist.get(N)) + "입니다.";
        	String msg2 = "(";
        	for(int k = 0;k<taskday.size();k++) {
        		msg2 += String.valueOf(taskday.get(k).get(0)) + "일 작업 : " + String.valueOf(taskday.get(k).get(1)) + " ";
        	}
        	msg2 += ")\n";
        	resultMsg.add(msg + msg2);
        	
        	titleList.add(taskListForJs.get(i).get("projectTitle").toString());
		}
		
		String resultMsgJSON = new ObjectMapper().writeValueAsString(resultMsg);
		model.addAttribute("resultMsg", resultMsgJSON);

		String resultpJSON = new ObjectMapper().writeValueAsString(resultp);
		model.addAttribute("resultp", resultpJSON);
		
		String titleListJSON = new ObjectMapper().writeValueAsString(titleList);
		model.addAttribute("titleList", titleListJSON);
		
    	ModelAndView mav = new ModelAndView("app/mypage");
    	return mav;
    }
    
    @RequestMapping("/app/memberManage")
    public ModelAndView memberManage(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception{
    	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userVO = (UserVO)principal; String username = userVO.getUsername();
		/*
		UserVO userInfo = userService.selectUserInfo(userVO.getUsername());
		String userInfoJSON = new ObjectMapper().writeValueAsString(userInfo);
		model.addAttribute("userInfo", userInfoJSON);*/
		String userInfoJSON = new ObjectMapper().writeValueAsString(userVO);
		model.addAttribute("userInfo", userInfoJSON);
		
		UserVO userSelectInfo = userService.selectUserInfo(username);
		String userSelectInfoJSON = new ObjectMapper().writeValueAsString(userSelectInfo);
		model.addAttribute("userSelectInfo", userSelectInfoJSON);
		
		List<UserVO> userList = userService.selectUserList();
		String userListJSON = new ObjectMapper().writeValueAsString(userList);
		model.addAttribute("userList", userListJSON);
		
    	ModelAndView mav = new ModelAndView("app/memberManage");
    	return mav;
    }
    
    @RequestMapping("/app/userInfoPage")
    public ModelAndView userInfoPage(HttpServletRequest request, HttpServletResponse response, ModelMap model, 
    		@RequestParam(value="username", required=true) String username) throws Exception{
    	Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userVO = (UserVO)principal;
		String userInfoJSON = new ObjectMapper().writeValueAsString(userVO);
		model.addAttribute("userInfo", userInfoJSON);
		
		UserVO userSelectInfo = userService.selectUserInfo(username);
		String userSelectInfoJSON = new ObjectMapper().writeValueAsString(userSelectInfo);
		model.addAttribute("userSelectInfo", userSelectInfoJSON);
		
		
		List<TaskVO> userTaskList = projectService.selecListUserTask(username);
		
		int max1 = 0;
		int max2 = 0;
		List<Map<String, String>> taskListForJs = new ArrayList<Map<String, String>>();
		String tmpId = "abcd1231233448288382";

		for(int i = 0; i<userTaskList.size();i++) {
			if(!tmpId.equals(userTaskList.get(i).getProjectIdx())) {
				tmpId = userTaskList.get(i).getProjectIdx();
				Map<String, String> tmpObj = new HashMap<String, String>();
				for(int k = 1; k<=14;k++) {
					tmpObj.put(Integer.toString(k)+"d", null);
				}
				tmpObj.put("projectTitle", userTaskList.get(i).getProjectTitle());
				tmpObj.put("name", userTaskList.get(i).getName());
				for(int j = 0;j<userTaskList.size();j++) {
					if(tmpId.equals(userTaskList.get(j).getProjectIdx())) {
						tmpObj.put(userTaskList.get(j).getTaskCategory() + "d", userTaskList.get(j).getImportance());
						max1 = max1 + 1;
						if(max1 > max2) max2 = max1;
					}
				}
				tmpObj.put("max", String.valueOf(max2));
				taskListForJs.add(tmpObj);
				max1 = 0; max2 = 0;
			}
		}
		
		String taskListForJsJSON = new ObjectMapper().writeValueAsString(taskListForJs);
		model.addAttribute("taskListForJs", taskListForJsJSON);
		
		List<Integer> resultp = new ArrayList<Integer>();
		List<String> titleList = new ArrayList<String>();
		List<String> resultMsg = new ArrayList<String>();
		
		for(int i = 0;i<taskListForJs.size();i++) {
			int N = Integer.parseInt(taskListForJs.get(i).get("max").toString());

			int[] taskArray = new int[N+1]; taskArray[0] = 0;
			for(int j = 1;j<=N;j++) {
				taskArray[j] = Integer.parseInt(taskListForJs.get(i).get(String.valueOf(j) +"d").toString());
			}

			List<Integer> plist = new ArrayList<Integer>();
        	ArrayList<ArrayList<Integer>> ptlist = new ArrayList<ArrayList<Integer>>();
        	algorithm.makePlist(plist, ptlist, taskArray);
        	resultp.add(plist.get(N));
        	//System.out.println(plist.get(N));
        	//System.out.println(ptlist.get(N));
        	
        	int[] cnt = new int[N+1];
        	Arrays.fill(cnt, 0);
        	for(int k = 0; k<ptlist.get(N).size();k++) {
        		cnt[ptlist.get(N).get(k)]++;
        	}

        	List<List<Integer>> taskday = new ArrayList<List<Integer>>();
        	for(int k = 1;k<=N;k++) {
        		if(cnt[k] > 0) {
        			List<Integer> tmp = new ArrayList<Integer>();
        			tmp.add(k);
        			tmp.add(cnt[k]*taskArray[k]);
        			taskday.add(tmp);
        		}
        	}

        	
        	String msg = taskListForJs.get(i).get("projectTitle").toString() + "의 작업 최대 효율은 " + String.valueOf(plist.get(N)) + "입니다.";
        	String msg2 = "(";
        	for(int k = 0;k<taskday.size();k++) {
        		msg2 += String.valueOf(taskday.get(k).get(0)) + "일 작업 : " + String.valueOf(taskday.get(k).get(1)) + " ";
        	}
        	msg2 += ")\n";
        	resultMsg.add(msg + msg2);
        	
        	titleList.add(taskListForJs.get(i).get("projectTitle").toString());
		}
		
		String resultMsgJSON = new ObjectMapper().writeValueAsString(resultMsg);
		model.addAttribute("resultMsg", resultMsgJSON);

		String resultpJSON = new ObjectMapper().writeValueAsString(resultp);
		model.addAttribute("resultp", resultpJSON);
		
		String titleListJSON = new ObjectMapper().writeValueAsString(titleList);
		model.addAttribute("titleList", titleListJSON);
		
    	ModelAndView mav = new ModelAndView("app/mypage");
    	return mav;
    }
 
}