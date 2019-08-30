<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ page import="java.util.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<jsp:include page="../common-css.jsp" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
<title>PIMS/마이페이지</title>
</head>
<body>
	<jsp:include page="../header.jsp" />
	<div id="main">
		<div class="wrapper">
			<jsp:include page="../left-sidebar.jsp" />
			<section id="content">
				<div class="container">
					<div class="section">
						<form class="row" id="updateUserForm" method="post"
							action="/user/updateUserAction">

							<div class="card-panel">
								<h4 class="header">회원 정보</h4>
								<div class="row margin">
									<div class="input-field col s12 m6 l3">
										<i class="material-icons prefix">perm_identity</i> <input
											id="username" name="username" type="text" readonly> <label
											for="username">아이디</label>
									</div>
									<div class="input-field col s12 m6 l3">
										<i class="material-icons prefix">person</i> <input id="name"
											name="name" type="text" readonly></input> <label for="name">
											이름 </label>
									</div>
								</div>
								<div class="row margin">
									<div class="input-field col s12 m6 l3">
										<i class="material-icons prefix">grade</i> <input id="grade"
											name="grade" type="text" readonly></input> <label for="grade">
											직급 </label>
									</div>
									<div class="input-field col s12 m6 l3">
										<i class="material-icons prefix">email</i> <input id="email"
											name="email" type="email" readonly> <label
											for="email">이메일</label>
									</div>
								</div>
								<div class="row">
									<div class="col s12">
										<a
											class="rndms_button waves-effect waves-light btn right indigo"
											id="updateBtn" onclick="updateMode()"><i
											class="material-icons left">save</i> <span>수정</span> </a>
											<a
											class="rndms_button waves-effect waves-light btn right indigo"
											id="modifyProfile" onclick="modifyProfile()" style="display:none;"><i
											class="material-icons left">save</i> <span>수정 완료</span> </a>
									</div>
								</div>
							</div>
						</form>
						<div class="card-panel">
							<h4 class="header">작업 일정</h4>
							<div id="taskList" class="row margin">
								<div class="col s12">
									<div id="jsGrid1"></div>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<textarea class="autosize" rows = "10" id="resultMsg" name="resultMsg" style="border: none; color: #FF0000;" readonly></textarea>
								</div>
							</div>
						</div>
						<div class = "card-panel">
							<div style="width: 500px; height: 500px; margin-left: auto; margin-right: auto;">
								<canvas id="taskChart"></canvas>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>

	<jsp:include page="../common-js.jsp" />
	<script
		src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"
		type="text/javascript"></script>
	<script type="text/javascript"
		src="<c:url value='/resources/rndms/vendors/nestable2/jquery.nestable.min.js'/>"></script>
	<!-- jsgrid -->
	<script type="text/javascript"
		src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
	<script>
		var userSelectInfo = ${userSelectInfo};
		var userTaskList = ${taskListForJs};
		var resultMsg = ${resultMsg};
		console.log(userTaskList);
		console.log(resultMsg);
		var lastTask = -1;
		for(var i = 0; i<userTaskList.length;i++){
			if(Number(userTaskList[i].max) > lastTask) lastTask = Number(userTaskList[i].max);
		}

		var resultp = ${resultp};
		var titleList = ${titleList};
		console.log(resultp);
		console.log(titleList);

		
		
		$(document).ready(function() {
			makejsgrid();
			makeChart();
			initMode();
		})
		
		function makeChart() {
			var ctx = document.getElementById("taskChart").getContext('2d');
			var myChart = new Chart(ctx, {
			    type: 'bar',
			    data: {
			        labels: titleList,
			        datasets: [{
			            label: '최대 중요도 합',
			            data: resultp,
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)'
			            ],
			            borderWidth: 1
			        }]
			    },
			    options: {
			        maintainAspectRatio: false, // default value. false일 경우 포함된 div의 크기에 맞춰서 그려짐.
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        },
			        title:{
			        	display: true,
						text: "프로젝트별 최대 중요도 합"
				    }
			    }
			});
		}

		function makejsgrid() {

			$("#jsGrid1").jsGrid({
				width : "100%",
				filtering : false,
				inserting : false,
				sorting : false,
				editing : false,
				autoload : true,
				paging : false,
				heading : true,
				data : userTaskList,
				noDataContent : "등록된 작업 일정이 없습니다.",
				fields : [ {
					title : "프로젝트명",
					name : "projectTitle",
					type : "text",
					align : "center",
					width : "10%"
				}, {
					title : "작업1",
					name : "1d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업2",
					name : "2d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업3",
					name : "3d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업4",
					name : "4d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}

				}, {
					title : "작업5",
					name : "5d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업6",
					name : "6d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업7",
					name : "7d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업8",
					name : "8d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업9",
					name : "9d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업10",
					name : "10d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업11",
					name : "11d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}

				}, {
					title : "작업12",
					name : "12d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업13",
					name : "13d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}, {
					title : "작업14",
					name : "14d",
					type : "text",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					}
				}]
			});
		}

		function initMode() {
			$("#username").val(userSelectInfo.username);
			$("#name").val(userSelectInfo.name);
			$("#grade").val(userSelectInfo.grade);
			$("#email").val(userSelectInfo.email);
			$("#username").attr("disabled", true);
			$("#name").attr("disabled", true);
			$("#grade").attr("disabled", true);
			$("#email").attr("disabled", true);

			var res = "";
			for(var i = 0; i<resultMsg.length;i++){
				res += resultMsg[i];
			}
			
			$("#resultMsg").val(res);

			if(lastTask != -1){
				for(var i = lastTask+1;i<=14;i++){
					$("#jsGrid1").jsGrid("fieldOption", String(i) + "d", "visible", false);
				}
			}
			else{
				for(var i = 8;i<=14;i++){
					$("#jsGrid1").jsGrid("fieldOption", String(i) + "d", "visible", false);
				}
			}
		}

		function updateMode(){
			$("#grade").attr("readonly", false);
			$("#email").attr("readonly", false);
			$("#grade").attr("disabled", false);
			$("#email").attr("disabled", false);
			$("#updateBtn").hide();
			$("#modifyProfile").show();
		}


		function modifyProfile() {
			$("#username").attr("disabled", false);
			console.log($("#username").val());
			$('#updateUserForm')
					.ajaxForm(
							{
								dataType : 'json',
								beforeSend : function(xmlHttpRequest) {
									xmlHttpRequest.setRequestHeader(
											"${_csrf.headerName}",
											"${_csrf.token}");
									//xmlHttpRequest.setRequestHeader("AJAX", "true");
								},
								beforeSubmit : function() {
									
								},
								success : function(responseText, statusText,
										xhr, $form) {
									if (responseText == true) {
										swal({
											title : "회원 정보 수정이 완료되었습니다!",
											text : "",
											type : "success",
											confirmButtonColor : "#DD6B55",
											confirmButtonText : "확인",
											closeOnConfirm : false,
											closeOnCancel : false
										}, function(isConfirm) {
											if (isConfirm) {
												location.reload();
											}
										});
									} else {
										alert("오류입니다.");
									}
								}
							})
			$('#updateUserForm').submit();
		}
	</script>
</body>
</html>
