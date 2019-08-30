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
<title>PIMS/프로젝트 등록</title>
</head>
<body>
<jsp:include page="../header.jsp" />
<div id="main">
<div class="wrapper">
<jsp:include page="../left-sidebar.jsp" />
<section id="content">
	<div class="container">
		<div class="section">
			<form class="row" id="makeProjectForm" method="post"
				action="/project/makeProjectAction">
				<div class="card-panel">
					<h4 class="header">세팅 정보</h4>
					<div class="row margin">
						<div class="input-field col s12 m6 l6">
							<i class="material-icons prefix">subtitles</i> <input id=title
								name="title" type="text"> <label for="title">프로젝트명</label>
						</div>
						<div class="input-field col s12 m6 l3">
							<i class="material-icons prefix">person_outline</i> <input
								id="ownerName" name="ownerName" type="text" readonly></input> <label for="ownerId"
								> 프로젝트 담당자 </label>
						</div>
					</div>
					<div class="row margin">
						<div class="input-field col s12 m6 l3">
							<i class="material-icons prefix">event_available</i> <input
								id="startDate" name="startDate" type="text" class="datepicker">
							<label for="startDate">과제 시작일 </label>
						</div>
						<div class="input-field col s12 m6 l3">
							<i class="material-icons prefix">event_busy</i> <input
								id="endDate" name="endDate" type="text" class="datepicker">
							<label for="endDate">과제 종료일</label>
						</div>
					</div>
				</div>


				<div class="card-panel">
					<h4 class="header">작업 일정</h4>
					<div class="row" style="margin-bottom:10px;">
						<div class = "col s12">
						<a id="delTaskBtn"
							class="rndms_button waves-effect waves-light btn right indigo"
							style="display: none;" onclick="delTask()"><span>일정 삭제</span>
						</a>
						<a id="addTaskBtn"
							class="rndms_button waves-effect waves-light btn right indigo"
							style="font-size: 1em; display: none;" onclick="addTask()"><span>일정
								추가</span> </a>
						
						</div> 
					</div>
				
					<div class="row margin">
						<div class="col s12">
							<div name="jsGrid1" id="jsGrid1"></div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s12">
						<a class="rndms_button waves-effect waves-light btn right indigo"
							id="registerBtn" onclick="registerBtn()"><i
							class="material-icons left">save</i> <span>프로젝트 세팅</span> </a>
					</div>
				</div>
			</form>
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

		var userInfo = ${userInfo};
		var userList = ${userList};
		var userSelectList = ${userSelectList};
		var userListJSON = makeCodeForJsgrid(userSelectList);

		lastTask = 7;
		$(document).ready(function() {
			makejsgrid();
			initMode();
		})

		function makejsgrid() {

			$("#jsGrid1").jsGrid({
				width : "100%",
				filtering : false,
				inserting : true,
				sorting : false,
				editing : true,
				autoload : true,
				paging : false,
				heading : true,
				//data : taskList,
				noDataContent : "등록된 작업 일정이 없습니다.",
				fields : [ {
					title : "이름",
					name : "username",
					type : "select",
					items : userSelectList,
					align : "center",
					valueField : "username",
					textField : "name",
					width : "10%",
					validate: {
                        message: "이미 등록된 사원입니다.",
                        validator: function(value, item){
                        	console.log(value);
                        	var data =  $("#jsGrid1").jsGrid("option", "data");
                        	for(var i = 0;i<data.length;i++){
								if(value == data[i].username)
									return false;
                            }
                            return true;
                        }
                    }
				}, {
					title : "직급(자동입력)",
					name : "grade",
					type : "text",
					width : "5%",
					align : "center",
					readOnly: "true",
					insertValue: function() {
                    	var id = $('#jsGrid1 .jsgrid-insert-row .jsgrid-cell select').val();
                    	for(var i = 0;i<userList.length;i++){
							if(id == userList[i].username)
								return userList[i].grade;
                        }
                	}
				}, {
					title : "작업1",
					name : "1d",
					type : "number",
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
					type : "number",
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
					type : "number",
					width : "5%",
					filterValue : function() {
						return this.filterControl.val();
					},

					insertValue : function() {
						return this.insertControl.val();
					},

					editValue : function() {
						return this.editControl.val();
					},
					validate: {
                        message: "0 ~ 100 사이의 수를 입력해주세요.",
                        validator: "range",
                        param: [0, 100]
                    }
				}, {
					title : "작업4",
					name : "4d",
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "number",
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
					type : "control",
					name : "control",
					width : 50
				}]
			});
		}

		function initMode() {
			 $("#ownerName").val(userInfo.name);
			 $("#delTaskBtn").show();
			 $("#addTaskBtn").show();
			 $("#jsGrid1").jsGrid("fieldOption", "8d", "visible", false);
             $("#jsGrid1").jsGrid("fieldOption", "9d", "visible", false);
             $("#jsGrid1").jsGrid("fieldOption", "10d", "visible", false);
             $("#jsGrid1").jsGrid("fieldOption", "11d", "visible", false);
             $("#jsGrid1").jsGrid("fieldOption", "12d", "visible", false);
             $("#jsGrid1").jsGrid("fieldOption", "13d", "visible", false);
             $("#jsGrid1").jsGrid("fieldOption", "14d", "visible", false);
		}

		function addTask(){
			$("#delTaskBtn").show();
			if(lastTask < 14){
				lastTask = lastTask + 1;
				$("#jsGrid1").jsGrid("fieldOption", String(lastTask) + "d", "visible", true);
				if(lastTask==14)
					$('#addTaskBtn').hide();
			}
		}

		function delTask(){
			if(lastTask > 1){
				if(lastTask == 2){
					$("#delTaskBtn").hide();
				}
				if(lastTask ==13){
					$('#addTaskBtn').show();
				}
				$("#jsGrid1").jsGrid("fieldOption", String(lastTask) + "d", "visible", false);
				lastTask = lastTask - 1;	
			}
		}

		
		function registerBtn() {
			var jsgrid1 = $("#jsGrid1").jsGrid("option", "data");
			var taskInfoList=[];
     	   for (var i=0; i<jsgrid1.length; i++){
     		   for (var j=0; j<14;j++){
     			   if(jsgrid1[i][String(j+1) + "d"] != null){
         			   var taskInfo=new Object();
         			    taskInfo.username=jsgrid1[i].username;
         				taskInfo.taskCategory=String(j+1);
         				taskInfo.importance=jsgrid1[i][String(j+1) + "d"];
         			    taskInfoList.push(taskInfo);
     			   }
     		   	}
     		}
			var items = JSON.stringify(taskInfoList);
			console.log(items);
			$('#makeProjectForm')
					.ajaxForm(
							{
								dataType : 'json',
								data:{
									"taskInfoList": items
									},
								beforeSend : function(xmlHttpRequest) {
									xmlHttpRequest.setRequestHeader(
											"${_csrf.headerName}",
											"${_csrf.token}");
									//xmlHttpRequest.setRequestHeader("AJAX", "true");
								},
								beforeSubmit : function() {
									if ($("#title").val() == "") {
										Materialize.toast("프로제그명을 입력해주세요.", 4000);
										$("#title").focus();
										return false;
									}
									if ($("#ownerName").val() == "") {
										Materialize.toast("담당자를 입력해주세요.", 4000);
										$("#ownerName").focus();
										return false;
									}
									if ($("#startDate").val() == "") {
										Materialize.toast("시작일을 입력해주세요.", 4000);
										$("#startDate").focus();
										return false;
									}
									if ($("#endDate").val() == "") {
										Materialize.toast("종료일을 입력해주세요.", 4000);
										$("#endDate").focus();
										return false;
									}
								},
								success : function(responseText, statusText,
										xhr, $form) {
									if (responseText == true) {
										swal({
											title : "프로젝트 세팅이 완료되었습니다!",
											text : "",
											type : "success",
											confirmButtonColor : "#DD6B55",
											confirmButtonText : "확인",
											closeOnConfirm : false,
											closeOnCancel : false
										}, function(isConfirm) {
											if (isConfirm) {
												location.href = "/project/";
											}
										});
									} else {
										alert("오류입니다.");
									}
								}
							})
			$('#makeProjectForm').submit();
		}
	</script>
</body>
</html>
