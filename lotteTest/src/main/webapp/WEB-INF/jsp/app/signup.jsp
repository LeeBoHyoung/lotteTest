<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<!DOCTYPE html>
<html lang="ko">

<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1" />
<title>LDCC PIMS 회원가입</title>
<jsp:include page="../common-css.jsp" />
<link rel="stylesheet"
	href="<c:url value='/resources/rndms/css/layouts/page-center.css'/>"
	type="text/css" />

</head>

<body class="blue lighten-4">

	<div id="login-page" class="row">
		<div class="col s12 z-depth-4 card-panel">
			<form class="login-form" id="signupForm" method="post"
				action="/user/signupAction">
				<div class="row">
					<div class="input-field col s12 center">
						<h5 class="center">회원가입</h5>
					</div>
				</div>
				<div class="row margin">
					<div class="input-field col s12">
						<i class="material-icons prefix pt-5">person_outline</i> <input
							id="username" name="username" type="text"
							autocomplete="new-password"> <label for="userId">아이디</label>
					</div>
				</div>
				<div class="row margin">
					<div class="input-field col s12">
						<i class="material-icons prefix pt-5">person_outline</i> <input
							id="name" name="name" type="text" autocomplete="new-password">
						<label for="name">이름</label>
					</div>
				</div>
				<div class="row margin">
					<div class="input-field col s12">
						<i class="material-icons prefix pt-5">lock_outline</i> <input
							id="password" name="password" type="password"
							autocomplete="new-password"> <label
							for="password">비밀번호</label>
					</div>
				</div>
				<div class="row margin">
					<div class="input-field col s12">
						<i class="material-icons prefix pt-5">email</i> <input
							id="email" name="email" type="email"
							autocomplete="new-password"> <label
							for="email">이메일</label>
					</div>
				</div>
				<div class="row margin">
					<div class="input-field col s12">
						<i class="material-icons prefix pt-5">grade</i> <input
							id="grade" name="grade" type="text"
							autocomplete="new-password"> <label
							for="grade">직급</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<a href="javascript:signupSubmit();"
							class="btn waves-effect waves-light col s12 indigo">회원가입</a>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6 m6 l6">
						<p class="margin medium-small">
							<a href="/user/signin">취소</a>
						</p>
					</div>
				</div>
			</form>

		</div>
	</div>

	<jsp:include page="../common-js.jsp" />
	<script>
		var userList = ${userList};
		function signupSubmit() {
			$('#signupForm').ajaxForm({
				dataType : 'json',
				beforeSend : function(xmlHttpRequest) {
					xmlHttpRequest.setRequestHeader("AJAX", true);

					//xmlHttpRequest.setRequestHeader("${_csrf.headerName}", "${_csrf.token}");
				},
				beforeSubmit : function() {
					for(var i=0;i<userList.length;i++){
						if(userList[i].username == $("#username").val()){
							Materialize.toast("이미 가입된 아이디입니다.", 4000);
							return false;
						}
					}
					if ($("#username").val() == "") {
						Materialize.toast("ID를 입력해 주세요.", 4000);
						$("#username").focus();
						return false;
					}
					if ($("#name").val() == "") {
						Materialize.toast("이름를 입력해 주세요.", 4000);
						$("#name").focus();
						return false;
					}
					if ($("#password").val() == "") {
						Materialize.toast("비밀번호를 입력해 주세요.", 4000);
						$("#password").focus();
						return false;
					}
				},
				success : function(responseText, statusText, xhr, $form) {
					if (xhr.statusText == "success") {
						swal({
							title : "회원가입이 완료되었습니다!",
							text : "",
							type : "success",
							confirmButtonColor : "#DD6B55",
							confirmButtonText : "확인",
							closeOnConfirm : false,
							closeOnCancel : false
						}, function(isConfirm) {
							if (isConfirm) {
								location.href = "/";
							}
						});
					}
				},
				error : function(xhr) {
					console.log(xhr);
					alert("ajax error: " + xhr.statusText);
				}
			});
			$("#signupForm").submit();
		}
	</script>
</body>

</html>
