package com.example.demo.project.mapper;
 
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.example.demo.project.vo.ProjectVO;
import com.example.demo.project.vo.TaskVO;
 
public interface ProjectMapper {
	
    public int insertProject(ProjectVO projectVO) throws Exception;
    public int updateUser(ProjectVO projectVO) throws Exception;
    public int deleteUser() throws Exception;
    public List<ProjectVO> selectListProject() throws Exception;
    public int insertProjectTask(TaskVO taskVO) throws Exception;
    public int insertProjectSetting(ProjectVO projectVO) throws Exception;
    public List<ProjectVO> selectOneProject(String idx) throws Exception;
    public List<TaskVO> selecListTask(String idx) throws Exception;
    public int updateProjectTask(List<TaskVO> taskList, String idx) throws Exception;
    public int deleteTask(String idx) throws Exception;
    public List<TaskVO> selecListUserTask(String username) throws Exception;
    public int selectCountBeforeStart() throws Exception;
    public int selectCountProceeding() throws Exception;
    public int selectCountFinished() throws Exception;
}