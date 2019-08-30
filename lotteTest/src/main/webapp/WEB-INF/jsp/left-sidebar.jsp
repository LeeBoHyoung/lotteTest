<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<link rel="stylesheet" href="<c:url value='/resources/rndms/vendors/dropify/css/dropify.css'/>" type="text/css" />
<html lang="ko">
<aside id="left-sidebar-nav">
    <ul id="slide-out" class="side-nav fixed leftside-navigation">
        <li class="cyan darken-1">
            <div class="row">
                <div class="col s8 m8 l8">
                    <p id="profile_name" style="font-size:22px; color:white; margin-top:25px; margin-left:10px;"></p>
                    <p id="profile_gradePosition" style=" font-size:15px; color:white; margin-top:-20px; margin-left:10px;"></p>
                </div>
            </div>
        </li>
        
        <li class="no-padding">
            <ul class="collapsible" id="menu" data-collapsible="accordion">
             
	        <li class="bold">
	          <a id="menu1_projectList" class="collapsible-header waves-effect waves-cyan" href="/project/">
	            <i class="material-icons">dvr</i>
	            <span class="nav-text">프로젝트 리스트</span>
	          </a>
	        </li>
	        <li class="bold">
	          <a id="menu1_makeProject" class="collapsible-header waves-effect waves-cyan" href="/project/projectSetting">
	            <i class="material-icons">web</i>
	            <span class="nav-text">프로젝트 등록</span>
	          </a>
	        </li>
	        <li class="bold">
	          <a id="menu1_mypage" class="collapsible-header  waves-effect waves-cyan" href = "/app/mypage">
	            <i class="material-icons">account_circle</i>
	            <span class="nav-text">마이페이지</span>
	          </a>
	        </li>
	        <li class="bold">
	          <a id="menu1_memberManage" class="collapsible-header  waves-effect waves-cyan" href = "/app/memberManage">
	            <i class="material-icons">format_list_bulleted</i>
	            <span class="nav-text">사원 정보 관리</span>
	          </a>
	        </li>
            </ul>
        </li>
    </ul>
</aside>
<script type="text/javascript" src="<c:url value='/resources/rndms/vendors/jquery-3.2.1.min.js'/>"></script>
<script>
    $(function() {
        // 유저정보 로드  좌측상단 프로필 데이터 바인딩
        $("#menu1_memberManage").hide();
        var userInfo = ${userInfo};
        var userSelectInfo = ${userSelectInfo};
		console.log(userInfo);
        $("#profile_name").text(userInfo.name);
        $("#profile_gradePosition").text(userSelectInfo.grade);
		for(var i = 0;userInfo.authorities.length;i++){
			if(userInfo.authorities[i].authority == "ADMIN"){
				$("#menu1_memberManage").show();
				break;
			}
		}
    });
</script>

</html>