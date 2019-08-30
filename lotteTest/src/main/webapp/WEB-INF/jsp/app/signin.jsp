<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1" />
<title>LDCC PIMS 로그인</title>
<jsp:include page="../common-css.jsp" />
<link rel="stylesheet"
	href="<c:url value='/resources/rndms/css/layouts/page-center.css'/>"
	type="text/css" />
</head>
<script type="text/javascript">
 window.history.forward();
 function noBack(){window.history.forward();}
</script>

<body class="blue lighten-4" onload="noBack();" onpageshow="if(event.persisted) noBack();" onunload="">
	
	<div id="login-page" class="row">
		<div class="col s12 z-depth-5 card-panel">
			<div class="row margin">
				<div class="input-field col s12 center" style="margin-top:30px; margin-bottom:30px">
					<img src="/resources/rndms/images/logo/img_symbol_logo.png" alt="" width="70px" height="70px"
						>
				</div>
			</div>
			<form class="login-form" id="loginForm" method="post"
				action="/user/executeSignin">
				<input type="hidden" name="${_csrf.parameterName}"
					value="${_csrf.token}" />

				<div class="row margin">
					<div class="input-field col s12">
						<i class="material-icons prefix pt-5">person_outline</i> <input
							id="username" name="username" type="text"
							autocomplete="new-password"> <label for="userId">아이디</label>
					</div>
				</div>
				<div class="row margin">
					<div class="input-field col s12">
						<i class="material-icons prefix pt-5">lock_outline</i> <input
							id="password" name="password" type="password" onkeyup="enterkey();"
							autocomplete="new-password"> <label for="password">비밀번호</label>
					</div>
				</div>

				<div class="input-field col s12">
					<input id="errorMsg" name="errorMsg"
						style="border: none; color: #FF0000;" readonly>
				</div>


				<div class="row margin col s12">
					<c:if test="${not empty errorMsg}">
						<font color="red"> * ${errorMsg} </font>
					</c:if>
				</div>



				<div class="row margin">
					<div class="col s12">
						<a
							class="rndms_button waves-effect waves-light btn right col s12 indigo"
							id="loginBtn" onclick="login()"><span>로그인</span></a>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6 m6 l6">
						<p class="margin medium-small">
							<a href="/user/signup">회원 가입</a>
						</p>
					</div>
				</div>
			</form>

		</div>
	</div>
	<jsp:include page="../common-js.jsp" />
	<script>
		$("#errorMsg").hide();
		$(document).ready(function() {
			/*$("#loginBtn").click(function() {
				if ($("#username").val() == "") {
					$("#errorMsg").val("* 아이디를 입력해주세요.");
					$("#errorMsg").show();
					$("#username").focus();
				} else if ($("#password").val() == "") {
					$("#errorMsg").val("* 비밀번호를 입력해주세요.");
					$("#errorMsg").show();
					$("#password").focus();
				} else {
					$("#loginForm").submit();
				}

			});*/

		});

		function login(){
			if ($("#username").val() == "") {
				$("#errorMsg").val("* 아이디를 입력해주세요.");
				$("#errorMsg").show();
				$("#username").focus();
			} else if ($("#password").val() == "") {
				$("#errorMsg").val("* 비밀번호를 입력해주세요.");
				$("#errorMsg").show();
				$("#password").focus();
			} else {
				$("#loginForm").submit();
			}
		}

		function enterkey() {
	        if (window.event.keyCode == 13) {
	             login();
	        }
	}

	</script>
</body>

</html>
