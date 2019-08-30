package com.example.demo.project.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.algorithm;
import com.example.demo.app.user.service.UserService;
import com.example.demo.app.user.vo.UserListVO;
import com.example.demo.app.user.vo.UserVO;
import com.example.demo.project.service.ProjectService;
import com.example.demo.project.vo.ProjectVO;
import com.example.demo.project.vo.TaskVO;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

@Controller
@RequestMapping("/project")
public class ProjectController {

	@Autowired
	ProjectService projectService;
	@Autowired
	UserService userService;

	
	@RequestMapping("/")
	public ModelAndView listProject(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userVO = (UserVO)principal; String username = userVO.getUsername();
		
		String userInfo = new ObjectMapper().writeValueAsString(userVO);
		model.addAttribute("userInfo", userInfo);
		
		UserVO userSelectInfo = userService.selectUserInfo(username);
		String userSelectInfoJSON = new ObjectMapper().writeValueAsString(userSelectInfo);
		model.addAttribute("userSelectInfo", userSelectInfoJSON);

		System.out.println(username);
		
		//프로젝트 시작/진행/종료 개수 가져오기
		int beforeStart = projectService.selectCountBeforeStart();
		int proceeding = projectService.selectCountProceeding();
		int finished = projectService.selectCountFinished();
		
		List<Integer> projectStatus = new ArrayList<Integer>();
		projectStatus.add(beforeStart);projectStatus.add(proceeding); projectStatus.add(finished);
		
		String projectStatusJSON = new ObjectMapper().writeValueAsString(projectStatus);
		model.addAttribute("projectStatus", projectStatusJSON);
		
		List<ProjectVO> listProject = projectService.selectListProject();
		String listProjectJSON = new ObjectMapper().writeValueAsString(listProject);
		model.addAttribute("listProject", listProjectJSON);

		ModelAndView mav = new ModelAndView("project/listProject");
		return mav;
	}
	
	@RequestMapping("/detailProject")
	public ModelAndView detailProject(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			@RequestParam(value="idx", required=true) String idx) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userVO = (UserVO)principal; String username = userVO.getUsername();
		
		String userInfo = new ObjectMapper().writeValueAsString(userVO);
		model.addAttribute("userInfo", userInfo);
		
		UserVO userSelectInfo = userService.selectUserInfo(username);
		String userSelectInfoJSON = new ObjectMapper().writeValueAsString(userSelectInfo);
		model.addAttribute("userSelectInfo", userSelectInfoJSON);
		
		String name = userVO.getName();

		System.out.println(name);
		model.addAttribute("name", name);
		List<UserVO> userList = userService.selectUserList();
		String userListJSON = new ObjectMapper().writeValueAsString(userList);
		model.addAttribute("userList", userListJSON);
		
		List<UserListVO> userSelectList = userService.selectUserListVO();
		String userSelectListJSON = new ObjectMapper().writeValueAsString(userSelectList);
		model.addAttribute("userSelectList", userSelectListJSON);
		
		List<ProjectVO> selectedProject = projectService.selectOneProject(idx);
		String selectedProjectJSON = new ObjectMapper().writeValueAsString(selectedProject);
		model.addAttribute("selectedProject", selectedProjectJSON);
		
		List<TaskVO> taskList = projectService.selecListTask(idx);
		int max1 = 0;
		int max2 = 0;
		List<Map<String, String>> taskListForJs = new ArrayList<Map<String, String>>();
		String tmpId = "abcd1231233448288382";

		for(int i = 0; i<taskList.size();i++) {
			if(!tmpId.equals(taskList.get(i).getUsername())) {
				tmpId = taskList.get(i).getUsername();
				Map<String, String> tmpObj = new HashMap<String, String>();
				for(int k = 1; k<=14;k++) {
					tmpObj.put(Integer.toString(k)+"d", null);
				}
				tmpObj.put("grade", taskList.get(i).getGrade());
				tmpObj.put("username", taskList.get(i).getUsername());
				tmpObj.put("name", taskList.get(i).getName());
				for(int j = 0;j<taskList.size();j++) {
					if(tmpId.equals(taskList.get(j).getUsername())) {
						tmpObj.put(taskList.get(j).getTaskCategory() + "d", taskList.get(j).getImportance());
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
		
		
		List<String> resultMsg = new ArrayList<String>();

		for(int i = 0;i<taskListForJs.size();i++) {
			int N = Integer.parseInt(taskListForJs.get(i).get("max").toString()); //작업 기간

			int[] taskArray = new int[N+1]; taskArray[0] = 0;
			for(int j = 1;j<=N;j++) {
				taskArray[j] = Integer.parseInt(taskListForJs.get(i).get(String.valueOf(j) +"d").toString());
			}

			List<Integer> plist = new ArrayList<Integer>();
        	ArrayList<ArrayList<Integer>> ptlist = new ArrayList<ArrayList<Integer>>();
        	algorithm.makePlist(plist, ptlist, taskArray);
        	
        	int[] cnt = new int[N+1];
        	Arrays.fill(cnt, 0);
        	for(int k = 0; k<ptlist.get(N).size();k++) { //ptlist는 작업1이 5번 선택되었다면 [1,1,1,1,1]을 반환함
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

        	
        	String msg = taskListForJs.get(i).get("name").toString() + " 님의 작업 최대 효율은 " + String.valueOf(plist.get(N)) + "입니다.";
        	String msg2 = "(";
        	for(int k = 0;k<taskday.size();k++) {
        		msg2 += String.valueOf(taskday.get(k).get(0)) + "일 작업 : " + String.valueOf(taskday.get(k).get(1)) + " ";
        	}
        	msg2 += ")\n";
        	resultMsg.add(msg + msg2);
		}
		
		String resultMsgJSON = new ObjectMapper().writeValueAsString(resultMsg);
		model.addAttribute("resultMsg", resultMsgJSON);
		
		
		ModelAndView mav = new ModelAndView("project/detailProject");
		return mav;
	}
	
	@RequestMapping("/projectSetting")
	public ModelAndView projectSetting(HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userVO = (UserVO)principal; 
		String username = userVO.getUsername(); String name = userVO.getName();

		String userInfo = new ObjectMapper().writeValueAsString(userVO);
		model.addAttribute("userInfo", userInfo);
		
		UserVO userSelectInfo = userService.selectUserInfo(username);
		String userSelectInfoJSON = new ObjectMapper().writeValueAsString(userSelectInfo);
		model.addAttribute("userSelectInfo", userSelectInfoJSON);
		
		System.out.println(name);
		model.addAttribute("name", name);
		List<UserVO> userList = userService.selectUserList();
		String userListJSON = new ObjectMapper().writeValueAsString(userList);
		model.addAttribute("userList", userListJSON);
		
		List<UserListVO> userSelectList = userService.selectUserListVO();
		String userSelectListJSON = new ObjectMapper().writeValueAsString(userSelectList);
		model.addAttribute("userSelectList", userSelectListJSON);
		
		ModelAndView mav = new ModelAndView("project/projectSetting");
		return mav;
	}

	@RequestMapping(value = "/makeProjectAction", produces = "text/plain;charset=UTF-8")
	@ResponseBody
	public String makeProjectAction(HttpServletRequest request, HttpServletResponse response, ModelMap model, ProjectVO projectVO,
			@RequestParam(value = "taskInfoList", required=false) String taskList) throws Exception {
		
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userVO = (UserVO)principal;
		
		projectVO.setOwnerId(userVO.getUsername());
		
		// Map<String, Object> resultMap = new HashMap<String, Object>();
		String result = "false";
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 들어있지않은 변수 무시
		
		JSONParser parser = new JSONParser();
		JSONObject obj = new JSONObject();
		JSONArray array = (JSONArray) parser.parse(taskList.replaceAll("'", "\""));
		obj.put("taskList", array);
		List<TaskVO> projectTaskVO = mapper.convertValue(obj.get("taskList"),
				TypeFactory.defaultInstance().constructCollectionType(List.class, TaskVO.class));
		
		projectVO.setTaskList(projectTaskVO);
		projectVO.setWrittenId(userVO.getUsername());
		
		try {
			int resultSetting = projectService.insertProjectSetting(projectVO);
			result = "true";
		} catch (Exception e) {
			System.out.println("insert user exception");
		} finally {
			System.out.println("INSERT 완료");
		}

		return result;
	}
	
	@RequestMapping(value="/updateTask", produces = "application/json")
	@ResponseBody
	public Map<String, Object> updateTask(HttpServletRequest request, HttpServletResponse response, ModelMap model,
			@RequestParam(value="idx", required=false) String idx,
			@RequestParam(value="taskList", required=false) String taskList) throws Exception {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal(); 
		UserVO userVO = (UserVO)principal; 
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 들어있지않은 변수 무시
		
		JSONParser parser = new JSONParser();
		JSONObject obj = new JSONObject();
		JSONArray array = (JSONArray) parser.parse(taskList.replaceAll("'", "\""));
		obj.put("taskList", array);
		List<TaskVO> projectTaskVO = mapper.convertValue(obj.get("taskList"),
				TypeFactory.defaultInstance().constructCollectionType(List.class, TaskVO.class));
		
		try {
			int resultUpdate = projectService.updateProjectTask(projectTaskVO, idx);
			resultMap.put("resultUpdate", true);
			resultMap.put("result", true);
		} catch (Exception e) {
			System.out.println("update user exception");
		} finally {
			System.out.println("UPDATE 완료");
		}

		return resultMap;
	}

}