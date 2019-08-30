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
<title>PIMS/프로젝트 리스트</title>
</head>
<body>
	<jsp:include page="../header.jsp" />
	<div id="main">
		<div class="wrapper">
			<jsp:include page="../left-sidebar.jsp" />
			<section id="content">
				<div class="container">
					<div class="card-panel">
							<div style="width: 300px; height: 300px; margin-left: auto; margin-right: auto;">
								<canvas id="projectChart"></canvas>
							</div>
					</div>
					<div class="card-panel">
						<h4 class="header">프로젝트 리스트</h4>
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
		//var userList = ${userList};
		//console.log(userList);
		var listProject = ${listProject};
		console.log(listProject);
		var projectStatus = ${projectStatus};
		console.log(projectStatus)
		$(document).ready(function() {
			makejsgrid();
			makeChart();
		})
		
		function makeChart() {
			var ctx = document.getElementById("projectChart").getContext('2d');
			var myChart = new Chart(ctx, {
			    type: 'pie',
			    data: {
			        labels: ["시작 전", "진행중", "종료"],
			        datasets: [{
			            label: '프로젝트 현황',
			            data: projectStatus,
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
			        title: {
						display: true,
						text: "프로젝트 현황"
				        }
			    }
			});
		}

		function makejsgrid() {
			var MyDateField = function(config) {
				jsGrid.Field.call(this, config);
			};
			MyDateField.prototype = new jsGrid.Field({
				sorter : function(date1, date2) {
					return new Date(date1) - new Date(date2);
				},

				itemTemplate : function(value) {
					if (value != null) {
						var valueSplit = value.split(' ', 2);
						return valueSplit[0];
					} else {
						return null;
					}
				}
			});

			jsGrid.fields.myDateField = MyDateField;

			$("#jsGrid1")
					.jsGrid(
							{
								height : "auto",
								width : "100%",
								filtering : true,
								sorting : true,
								paging : true,
								autoload : true,
								data : listProject,
								align : "center",
								pageSize : 10,
								pageButtonCount : 10,
								pageNextText : "다음",
								pagePrevText : "이전",
								pageFirstText : "처음",
								pageLastText : "마지막",
								heading : true,
								noDataContent : "등록된 프로젝트가 없습니다.",
								controller : {
									loadData : function(filter) {
										return $
												.grep(
														listProject,
														function(item) {
															return (!filter.title || item.title
																	.indexOf(filter.title) > -1)
																	&& (!filter.ownerId || item.ownerId
																			.indexOf(filter.ownerId) > -1)
																	&& (!filter.startDate.date || moment(
																			item.startDate)
																			.format(
																					'YYYY-MM-DD') >= filter.startDate.date)
																	&& (!filter.endDate.date || moment(
																			item.endDate)
																			.format(
																					'YYYY-MM-DD') >= filter.endDate.date);
														});
									}

								},
								fields : [
										{
											title : "프로젝트명",
											name : "title",
											type : "text",
											sorting : true,
											width : 100,
											align : "center"
										},
										{
											title : "담당자명",
											name : "ownerName",
											type : "text",
											sorting : true,
											width : 50,
											align : "center"
										},
										{
											title : "과제 착수 일시",
											name : "startDate",
											type : "myDateField",
											width : 50,
											align : "center",
											filterTemplate : function() {
												var filterDate = $("<input>")
														.attr(
																{
																	"type" : "text",
																	"class" : "datepicker",
																	"id" : "startDateFilter",
																	"style" : "width:75%;text-align:center;"
																});
												return $("<div>").append(
														filterDate).append(
														' ~ ');
											},
											filterValue : function() {
												return {
													date : $('#startDateFilter')
															.val()
												};
											},
											itemTemplate : function(value, item) {
												var result;
												if (value == null
														|| value.length == 0) {
													result = value;
												} else {
													result = moment(value)
															.format(
																	'YYYY-MM-DD');
												}
												return result;
											}
										},
										{
											title : "과제 종료 일시",
											name : "endDate",
											type : "myDateField",
											width : 50,
											align : "center",
											filterTemplate : function() {
												var filterDate = $("<input>")
														.attr(
																{
																	"type" : "text",
																	"class" : "datepicker",
																	"id" : "endDateFilter",
																	"style" : "width:75%;text-align:center;"
																});
												return $("<div>").append(
														filterDate).append(
														' ~ ');
											},
											filterValue : function() {
												return {
													date : $('#endDateFilter')
															.val()
												};
											},
											itemTemplate : function(value, item) {
												var result;
												if (value == null
														|| value.length == 0) {
													result = value;
												} else {
													result = moment(value)
															.format(
																	'YYYY-MM-DD');
												}
												return result;
											}
										} ],
								rowClick : function(args) {
									var getData = args.item;
									location.href = '/project/detailProject?idx='
											+ getData.idx;
								}
							});

		}
	</script>

</body>
</html>
