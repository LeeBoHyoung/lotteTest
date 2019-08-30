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
<title>PIMS/프로젝트 상세</title>
</head>
<body>
<jsp:include page="../header.jsp" />
<div id="main">
<div class="wrapper">
<jsp:include page="../left-sidebar.jsp" />
<section id="content">
	<div class="container">
		<div class="section">
				<div class="card-panel">
					<h4 class="header">세팅 정보</h4>
					<div class="row margin">
						<div class="input-field col s12 m6 l6">
							<i class="material-icons prefix">subtitles</i> <input id=title
								name="title" type="text" readonly> <label for="title">프로젝트명</label>
						</div>
						<div class="input-field col s12 m6 l3">
							<i class="material-icons prefix">person_outline</i> <input
								id="ownerName" name="ownerName" type="text" readonly></input> <label for="ownerName"
								> 프로젝트 담당자 </label>
						</div>
					</div>
					<div class="row margin">
						<div class="input-field col s12 m6 l3">
							<i class="material-icons prefix">event_available</i> <input
								id="startDate" name="startDate" type="text" class="datepicker" readonly>
							<label for="startDate">과제 시작일 </label>
						</div>
						<div class="input-field col s12 m6 l3">
							<i class="material-icons prefix">event_busy</i> <input
								id="endDate" name="endDate" type="text" class="datepicker" readonly>
							<label for="endDate">과제 종료일</label>
						</div>
					</div>
				</div>


				<div class="card-panel">
					<h4 class="header">작업 일정</h4>
					<div class="row" style="margin-bottom:10px;">
						<div class = "col s12">
						<a id="addTaskBtn"
							class="rndms_button waves-effect waves-light btn right indigo"
							style="font-size: 1em; display: none;" onclick="addTask()"><span>작업
								추가</span> </a> 
						<a id="delTaskBtn"
							class="rndms_button waves-effect waves-light btn right indigo"
							style="display: none;" onclick="delTask()"><span>작업 삭제</span>
						</a>
						</div>
					</div>
					<div id="project" class="row margin">
						<div class="col s12">
							<div id="jsGrid1"></div>
						</div>
					</div>
					<div class="row">
						<div class="col s12">
							<textarea rows = "5" id="resultMsg" name="resultMsg" style="border: none; color: #FF0000;" readonly></textarea>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col s12">
						<a class="rndms_button waves-effect waves-light btn right indigo"
							id="modifyBtn" onclick="updateMode()" ><i
							class="material-icons left">save</i> <span>수정</span> </a>
						<a class="rndms_button waves-effect waves-light btn right indigo"
							id="updateComplete" onclick="updateComplete()" style="display:none;"><i
							class="material-icons left">save</i> <span>수정완료</span> </a>
						<a class="rndms_button waves-effect waves-light btn right indigo" id="cancel"
							href="/project/" ><i
							class="material-icons left">cancel</i> <span>취소</span> </a>
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

	    var userInfo = ${userInfo};
		var userList = ${userList};
		console.log(userList);
		var userSelectList = ${userSelectList};
		console.log(userSelectList);
		var projectInfo = ${selectedProject};
		var taskList = ${taskListForJs};
		console.log(projectInfo);
		console.log(taskList);
		
		var lastTask = -1;
		for(var i = 0; i<taskList.length;i++){
			if(Number(taskList[i].max) > lastTask) lastTask = Number(taskList[i].max);
		}

		var msg = ${resultMsg};


		var maxDay = lastTask;
		
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
				editing : false,
				autoload : true,
				paging : false,
				heading : true,
				data : taskList,
				noDataContent : "등록된 작업 일정이 없습니다.",
				fields : [ {
					title : "이름",
					name : "username",
					type : "select",
					items : userSelectList,
					align : "center",
					valueField : "username",
					textField : "name",
					width : "10%"
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
                    type: "control",
                    name: "control",
                    width: 50
                }]
			});
		}

		function initMode() {
			$("#cancel").hide();
			$("#title").val(projectInfo[0].title);
			$("#ownerName").val(projectInfo[0].ownerName);
			$("#startDate").val(projectInfo[0].startDate.substring(0,10));
			$("#endDate").val(projectInfo[0].endDate.substring(0,10));
			
			var res = "";
			for(var i = 0; i<msg.length;i++){
				res += msg[i];
			}
			$("#resultMsg").val(res);
			for(var i = lastTask+1;i<=14;i++){
				$("#jsGrid1").jsGrid("fieldOption", String(i) + "d", "visible", false);
			}

			$("#jsGrid1").jsGrid("fieldOption", "control", "visible", false);

			if(userInfo.username != projectInfo[0].ownerId){
				$("#modifyBtn").hide();
			}
		}

		function updateMode(){
			$("#jsGrid1").jsGrid("fieldOption", "control", "visible", true);
			$("#jsGrid1").jsGrid({editing:true});
			$("#updateComplete").show();

			$("#modifyBtn").hide();
			$("#cancel").show();

			$('#addTaskBtn').show();
			$("#jsGrid1").jsGrid("fieldOption", "control", "visible", true);
		}

		
		function addTask(){
			$("#delTaskBtn").show();
			if(maxDay < 14){
				maxDay = maxDay + 1;
				$("#jsGrid1").jsGrid("fieldOption", String(maxDay) + "d", "visible", true);
				if(maxDay==14)
					$('#addTaskBtn').hide();
			}
		}

		function delTask(){
			if(maxDay > lastTask){
				if(maxDay == lastTask+1){
					$("#delTaskBtn").hide();
				}
				if(maxDay ==13){
					$('#addTaskBtn').show();
				}
				$("#jsGrid1").jsGrid("fieldOption", String(maxDay) + "d", "visible", false);
				maxDay = maxDay - 1;	
			}
		}

		function updateComplete() {
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
			var idx = projectInfo[0].idx;
			console.log(items);
            $.ajax({
                dataType:'json',
            	method: "POST",
            	url: "/project/updateTask",
                data: {
                	"idx": idx,
                	"taskList": items
                },
                beforeSend: function(xmlHttpRequest){
                	xmlHttpRequest.setRequestHeader(
							"${_csrf.headerName}",
							"${_csrf.token}");
                    },
                success: function(json, xhr){
                    console.log(json);
                    console.log(xhr);
                    if(json.result == true){
                	swal({
                                title: "프로젝트 수정",
                                text: "프로젝트가 성공적으로 수정되었습니다.",
                                type: "success",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "확인",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                            function(isConfirm) {
                                if (isConfirm) {
                                    location.reload();
                                }
                            });
                    }
                    else{
						alert("ajax 에러")
                        }
                }
            });

		}
		
		
	</script>
</body>
</html>
