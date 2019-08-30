
(function ($) {
  $.extend(true, window, {
    Chamomile:{
    	AddRemove: ChamAddRemove
    }
    
  });


  function ChamAddRemove(container, left, right, clickListener, afterMoveListener) {
	  
	init(); 
	
	var _timestamp;
	  
	var _leftId;
	var _rightId;
	var _moveLeftBtnId;
	var _moveRightBtnId;
	var functionTag="";
	

    function init(){
    	//버튼 ID중복을 막기위해 generating
    	_timestamp = Date.now();
  	  
    	_leftId = "__cham_addremove_left_" + _timestamp;
    	_rightId = "__cham_addremove_right_" + _timestamp;
    	_moveLeftBtnId = "__cham_addremove_btn_moveleft_" + _timestamp;
    	_moveRightBtnId = "__cham_addremove_btn_moveright_" + _timestamp;

    	//함수 이름을 가져오면 오른쪽 영역클릭시 해당 함수가 호출되도록 html태그에 추가
    	//if ( typeof functionName != "undefined" && functionName != "" && functionName != null  ) {
    	//	functionTag= " onclick='javascript:"+functionName+"(this);'"
    	//}
    	//기본 틀 생성
    	var html = "";
    	html += "<div style='height:100%;width:100%'>";
    	html += "	<div class='row align-items-center' style='padding-left:13%;height:100%;'>";    	
    	html += "		<div class='col-md-4' style='text-align:center;height:100%;'>";
    	html += "			<span>" + left + "</span>";
    	html += "			<div style='overflow:scroll;border:1px solid #BDBDBD;width:100%;height:100%;text-align: left;' id='" + _leftId + "' class='form-control'>";
    	html += "               <ul class='addremove-box'>";
    	
    	
    	html += "			</ul></div>";
    	html += "		</div>";
    	html += "		<div class='col-md-2' style='text-align:center;height:100%;'>";
    	html += "			<div style='margin:auto;height:100%;transform:translate(0%,50%)'>";	
    	html += "				<button class='btn btn-default' type='button' id='" + _moveRightBtnId + "'><i class='fa fa-angle-double-right' aria-hidden='true'></i></button><br>";
    	html += "				<button class='btn btn-default' type='button' id='" + _moveLeftBtnId + "' style='margin-top:2px;'><i class='fa fa-angle-double-left' aria-hidden='true'></i></button>";
    	html += "			</div>";
    	html += "		</div>";
    	html += "		<div class='col-md-4' style='text-align:center;height:100%;'>";
    	html += "			<span>" + right + "</span>";
    	html += "			<div style='overflow:scroll;border:1px solid #BDBDBD;width:100%;height:100%;text-align: left;' id='" + _rightId +"' class='form-control'>";
    	html += "               <ul class='addremove-box'>";
    			
    	html += "			</ul></div>";
    	html += "		</div>";
    	
    	html += "	</div>";
    	html += "</div>";
    	$(container).empty();
    	$(container).append(html);
    	
    	
    	$("#" + _moveRightBtnId).on("click", function(e){
    		/*if (typeof beforeMoveListener !== "undefined"){    			
    			var retval = {};
    			retval.direction = "right";    			
    			beforeMoveListener(retval);
    		}   */
    		
    		var movedItems = moveRight();
    		
    		if (typeof afterMoveListener !== "undefined"){    			
    			var retval = {};
    			retval.direction = "right"; 
    			retval.items = movedItems;
    			afterMoveListener(retval);
    		}   
    	});
    	
    	$("#" + _moveLeftBtnId).on("click", function(e){
    		/*if (typeof beforeMoveListener !== "undefined"){    			
    			var retval = {};
    			retval.direction = "left";    			
    			beforeMoveListener(retval);
    		} */
    		var movedItems = moveLeft();
    		
    		if (typeof afterMoveListener !== "undefined"){    			
    			var retval = {};
    			retval.direction = "left";   
    			retval.items = movedItems;
    			afterMoveListener(retval);
    		}   
    	})
    	
    	
    	$("#" + _rightId ).on("click","li", function(e){
    		$(this).siblings().removeClass("li-selected");
    		$(this).toggleClass("li-selected");
    		
    		if (typeof clickListener !== "undefined"){
    			
    			var retval = {};
    			retval.position = "right";
    			retval.object = this;
    			
    			clickListener(retval);
    		}    		
    	})
    	
    	$("#" + _leftId ).on("click","li", function(e){
    		$(this).siblings().removeClass("li-selected");
    		$(this).toggleClass("li-selected");
    		
    		if (typeof clickListener !== "undefined"){
    			var retval = {};
    			retval.position = "left";
    			retval.object = this;
    			
    			clickListener(retval);
    		}    		
    	})
    	
    	
    	
    }
    $.extend(this, {        
        "addLeft": addLeft,
        "addRight": addRight,
        "moveRight": moveRight,
        "moveLeft": moveLeft,
        "getRightValues": getRightValues,
        "getLeftValues": getLeftValues,
        "clearLeft": clearLeft,
        "clearRight": clearRight,
        "clear": clear,
        "setLeft": setLeft,
        "setRight": setRight,
        "getLastMovedItems":getLastMovedItems
        
    })
    
    
      
    //왼쪽 selectbox 데이터 add
    function addLeft(leftData){
    	var html = "";
    	for (var idx = 0 ; idx < leftData.length ; idx++){
    		var fixedItem = "";
    		if (leftData[idx].fixed){
    			fixedItem = "*";
    		}
    		html += "			<li origin='left' fixed='" + leftData[idx].fixed + "' value='" + leftData[idx].val + "'>" + leftData[idx].text + fixedItem + "</li>";
    	} 
    	$("#" + _leftId + " ul").append(html);
    }
    //오른쪽 selectbox 데이터 add
    function addRight(rightData){
    	
    	
    	var html = "";
    	for (var idx = 0 ; idx < rightData.length ; idx++){
    		var fixedItem = "";
    		if (rightData[idx].fixed){
    			fixedItem = "*";
    		}
    		html += "			<li origin='right' fixed='" + rightData[idx].fixed + "'value='" + rightData[idx].val + "'>" + rightData[idx].text + fixedItem + "</li>";
    	} 
    	$("#" + _rightId + " ul").append(html);
    }
    //왼쪽 -> 오른쪽으로 이동. 단, fixed='true' 속성은 옮기지 않음
    function moveRight(){
    	
    	
    	
    	var selectedOptions = $("#" + _leftId + " li.li-selected").not("[fixed='true']");
    	var len = selectedOptions.length;
    	var obj = [];
    	
    	for (var i = 0 ; i < len ; i++){
    		var trgt = selectedOptions[i];
    		if ($(trgt).attr("origin") == "left"){
    			$(trgt).css("color", "#fb6b5b").css("fontWeight","bold");
    		}else{
    			$(trgt).css("color", "#000000").css("fontWeight","normal");
    		}
    		$(trgt).removeClass("li-selected");
    		$("#" + _rightId + " ul").append(trgt);	
    		obj.push(trgt);
    		
    	}
    	
    	return obj;
    	
    }
    
    //오른쪽 -> 왼쪽으로 이동. 단, fixed='true' 속성은 옮기지 않음
    function moveLeft(){
    	
    	var selectedOptions = $("#" + _rightId + " li.li-selected").not("[fixed='true']");
    	
    	var len = selectedOptions.length;
    	var obj = [];
    	
    	for (var i = 0 ; i < len ; i++){
    		
    		var trgt = selectedOptions[i];
    		
    		if ($(trgt).attr("origin") == "right"){
    			$(trgt).css("color", "#fb6b5b").css("fontWeight","bold");
    		}else{
    			$(trgt).css("color", "#000000").css("fontWeight","normal");
    		}
    		$(trgt).removeClass("li-selected");
    		$("#" + _leftId + " ul").append(trgt);
    		obj.push(trgt);
    	}
    	
    	return obj;
    	
    	
    }
    function getLastMovedItems(){
    	return _lastMovedItem;
    }
    //오른쪽 데이터 가져오기
    function getRightValues(){
    	var options = $("#" + _rightId + " li");
    	
    	var retval = [];
    	
    	for (var idx = 0 ; idx < options.length ; idx++){
    		var obj = {};
    		obj.val = $(options[idx]).attr("value");
    		obj.text = $(options[idx]).text();
    		obj.fixed = $(options[idx]).attr("fixed") == "true" ? "true": "false";
    		obj.origin = $(options[idx]).attr("origin");
    		retval.push(obj);
    	}
    	
    	return retval;
    	
    }
    
    //왼쪽 데이터 가져오기
    function getLeftValues(){
    	var options = $("#" + _leftId + " li");
    	
    	var retval = [];
    	
    	for (var idx = 0 ; idx < options.length ; idx++){
    		var obj = {};
    		obj.val = $(options[idx]).attr("value");
    		obj.text = $(options[idx]).text();
    		obj.fixed = $(options[idx]).attr("fixed") == "true" ? "true": "false";
    		obj.origin = $(options[idx]).attr("origin");
    		
    		retval.push(obj);
    	}
    	
    	return retval;
    }
    
    //왼쪽 목록 초기화
    function clearLeft(){
    	$("#" + _leftId + " ul").empty();    	
    }
    
    //오른쪽 목록 초기화
    function clearRight(){    	
    	$("#" + _rightId + " ul").empty();
    }
    
    //전체 초기화
    function clear(){
    	clearLeft();
    	clearRight();
    }
    
    //왼쪽에 데이터 넣기(add아님)
    function setLeft(reLeft){
    	
    	clearLeft();
    	addLeft(reLeft);
    }
    //오른쪽에 데이터 넣기(add아님)
    function setRight(reRight){
    	clearRight();
    	addRight(reRight);
    }
    
  }
}(jQuery));
