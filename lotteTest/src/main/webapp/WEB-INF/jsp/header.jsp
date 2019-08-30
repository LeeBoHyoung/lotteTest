<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html lang="ko">
<header id="header" class="page-topbar">
    <!-- start header nav-->
    <div class="navbar-fixed">
        <nav class="navbar-color gradient-45deg-lime darken-4">
            <div class="nav-wrapper">
                <ul class="left">
                 <div class="row">
	              <img src="/resources/rndms/images/logo/img_symbol_logo.png" alt="" width="50px" height="50px" style="margin-top:6px; margin-left:20px;">
	              <span style="font-size:30px;margin-left:10px;margin-bottom:20px;color:white;">PIMS</span>
	             </div>
	              
	          </ul>
				<ul class="right">
                    <li>
                        <a href="<c:url value=" /logout"/>" class="white-text">로그아웃
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <!-- end header nav-->
</header>

</html>