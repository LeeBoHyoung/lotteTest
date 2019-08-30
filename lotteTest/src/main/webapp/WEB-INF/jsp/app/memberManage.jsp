<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<jsp:include page="../common-css.jsp" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
<title>PIMS/사원 정보</title>
</head>
<body>
	<jsp:include page="../header.jsp" />
	<div id="main">
		<div class="wrapper">
			<jsp:include page="../left-sidebar.jsp" />
			<section id="content">
				<div class="container">
					<div class="card-panel">
						<h4 class="header">사원 정보 리스트</h4>
						<div id="project" class="row margin">
							<div class="col s12">
								<div id="jsGrid1"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>

	<jsp:include page="../common-js.jsp" />

	<!-- jsgrid -->
	<script type="text/javascript"
		src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
	<script type="text/javascript"
		src="<c:url value='/resources/rndms/vendors/moment.js'/>"></script>


	<script>
		var userList = ${userList};
		console.log(userList);
		
		$(document).ready(function() {
			makejsgrid();
		})
		
		function makejsgrid(){

			$("#jsGrid1")
					.jsGrid(
							{
								height : "auto",
								width : "100%",
								filtering : false,
								sorting : true,
								paging : true,
								autoload : true,
								data : userList,
								align : "center",
								pageSize : 10,
								pageButtonCount : 10,
								pageNextText : "다음",
								pagePrevText : "이전",
								pageFirstText : "처음",
								pageLastText : "마지막",
								heading : true,
								noDataContent : "등록된 프로젝트가 없습니다.",
								fields : [
										{
											title : "아이디",
											name : "username",
											type : "text",
											sorting : true,
											width : 50,
											align : "center"
										},
										{
											title : "이름",
											name : "name",
											type : "text",
											sorting : true,
											width : 100,
											align : "center"
										}, {
											title : "직급",
											name : "grade",
											type : "text",
											sorting : true,
											width : 100,
											align : "center"
										}, {
											title : "이메일",
											name : "email",
											type : "text",
											sorting : true,
											width : 100,
											align : "center"
										}],
								rowClick : function(args) {
									var getData = args.item;
									location.href = '/app/userInfoPage?username='
											+ getData.username;
								}
							});

		}
	</script>

</body>
</html>
