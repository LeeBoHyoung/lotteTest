package com.example.demo.project.service;
 
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.demo.project.mapper.ProjectMapper;
import com.example.demo.project.vo.ProjectVO;
import com.example.demo.project.vo.TaskVO;
 
@Service
public class ProjectService {

    @Autowired
    ProjectMapper projectMapper;
    
    public int updateUser(List<ProjectVO> projectVOList) throws Exception{
    	projectMapper.deleteUser();
    	int result = 0;
    	for(int i = 0;i<projectVOList.size();i++) {
    		result = projectMapper.insertProject(projectVOList.get(i));
    	}
    	return result;
    }
    
    public List<ProjectVO> selectListProject() throws Exception{
    	return projectMapper.selectListProject();
    }
    
    public int insertProjectSetting(ProjectVO projectVO) throws Exception{
    	int result = projectMapper.insertProjectSetting(projectVO);
    	for(int i =0; i<projectVO.getTaskList().size(); i++) {
            if(!projectVO.getTaskList().get(i).getImportance().equals("")) {
                   projectVO.getTaskList().get(i).setProjectIdx(projectVO.getIdx());
                   projectVO.getTaskList().get(i).setProjectTitle(projectVO.getTitle());
                   projectMapper.insertProjectTask(projectVO.getTaskList().get(i));
            }
    	}
    	return result;
    }
    
    public List<ProjectVO> selectOneProject(String idx) throws Exception{
    	return projectMapper.selectOneProject(idx);
    }
    
    public List<TaskVO> selecListTask(String idx) throws Exception{
    	return projectMapper.selecListTask(idx);
    }
    
    public int updateProjectTask(List<TaskVO> taskList, String idx) throws Exception{
    	System.out.println("before");
    	int result = projectMapper.deleteTask(idx);
    	System.out.println("after");
    	for(int i = 0;i<taskList.size();i++) {
    		if(!taskList.get(i).getImportance().equals("")) {
    			taskList.get(i).setProjectIdx(idx);
    			projectMapper.insertProjectTask(taskList.get(i));
    		}
    	}
    	return result;
    }
    
    public List<TaskVO> selecListUserTask(String username) throws Exception{
    	return projectMapper.selecListUserTask(username);
    }
    
    public int selectCountBeforeStart() throws Exception{
    	return projectMapper.selectCountBeforeStart();
    }
    
    public int selectCountProceeding() throws Exception{
    	return projectMapper.selectCountProceeding();
    }
    
    public int selectCountFinished() throws Exception{
    	return projectMapper.selectCountFinished();
    }
    
    
}