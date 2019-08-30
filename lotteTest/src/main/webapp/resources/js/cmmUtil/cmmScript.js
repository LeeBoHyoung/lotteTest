

function isEmpty(input) {
    if (input.value == null || input.value.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
}
 
function isEmptyStr(sVal) {
    if (sVal == null || sVal.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
}



//
function toUpperCase(str){ 
 if(isEmpty(str)) return str;
 return str.toUpperCase();
}

// json map 을 스트링으로 변환하여 보여준다.

function JSONtoString(object){
	var results = [];
	for (var property in object) {
		var value = object[property];
		if(value == null){
			value = '""';
		} else if(typeof(value) == 'object'){
			value=JSONtoString(value);
		}
		if(typeof(value) == 'string'){
			if (value.substr(0,1) == '{' || value == '""')
				results.push('"'+property.toString()+'"' + ': ' + value);
			else if (value) 
				results.push('"'+property.toString()+'"' + ': "' + value + '"');
		} else {
			results.push('"'+property.toString()+'"' + ': "' + value + '"');
		}
	}
	
	return '{' + results.join(', ') + '}';
}

function cfReturnTrue(){
	return true;
}

//날자 변환
function dateFormat(str, divStr){
	var rtnDateVal = "";
	var year = "";
	var month = "";
	var day = "";
	var hh = "";
	var mm = "";
	var ss = "";
	
	if(str.length < 9){
		year = str.substr(0,4);
		month = str.substr(4,2);
		day = str.substr(6,2);			
		rtnDateVal = year+divStr+month+divStr+day;
	}else if(str.length > 9 && str.length < 15 ){
		
		year = str.substr(0,4);
		month = str.substr(4,2);
		day = str.substr(6,2);
		hh = str.substr(8,2);
		mm = str.substr(10,2);
		ss = str.substr(12,2);
		
		rtnDateVal = year+divStr+month+divStr+day+ " "+ hh + ":" + mm +":" + ss;
		
	}
	
	return rtnDateVal;
}

//숫자 3자리 마다 콤마 
function numWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//전화번호 정규식
function fn_tel_num(obj) {
	obj.value = obj.value.replace(/\s|\-/g, '').replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
    return true;
}


//ID 체크 onblur="javascript:IdCheck(this.value, this);"
function IdCheck(checkString,obj){
	//alert (checkString);
  var id = checkString;
  if(!/^[a-zA-Z0-9]{6,50}$/.test(id)){
	if (id=="") return false;
	alert("ID는 영문자 숫자의 조합으로 6자리 이상 사용해야 합니다.");
    obj.focus();
    return false;
 }
 var chk_num = id.search(/[0-9]/g);
 var chk_eng = id.search(/[a-z]/ig);
 if(chk_num < 0 || chk_eng < 0){
	     if (id=="") return false;
	 alert("ID는 영문자와 숫자를 혼용하여야 합니다.");
     obj.focus();
     return false;
 }
}	
//비밀번호 조건 체크  onblur="javascript:passwordCheck(this.value, this);"
function passwordCheck(checkString,obj){
  var upw = checkString;
  var id = $("#Employee-Save-Input-Id").val() ;
  if(!/^[a-zA-Z0-9!@#$%^&*()?_~]{6,15}$/.test(upw)){
	 if (upw=="") return false;
	 alert("비밀번호는 숫자, 영문자 조합이어야 합니다."); 
     obj.focus();
     return false;
 }
 var chk_num = upw.search(/[0-9]/g);
 var chk_eng = upw.search(/[a-z]/ig);
 var chk_spe = upw.search(/[!@#$%^&*()?_~]/g);

 if(upw.length<8 || upw.length>16 ) {
     if (upw=="") return false;
     alert("비밀번호는 최소 8자리 이상 최대 16자리 이하여야 합니다.");	  
     obj.focus();
     return false;
 }else if(chk_eng<0 ){
	 if(upw.length<10 || upw.length>16 ) {
		 if (upw=="") return false;
	     alert("비밀번호가  2종류 조합일경우 최소 10자리 이상 최대 16자리 이하여야 합니다.");
	     obj.focus();
	     return false;
	 }
 }else if(chk_spe<0 ){
	 if(upw.length<10 || upw.length>16 ) {
		 if (upw=="") return false;
	     alert("비밀번호가  2종류 조합일경우 최소 10자리 이상 최대 16자리 이하여야 합니다.");
	     obj.focus();
	     return false;
	 }
 }
 
  // 동일한 문자/숫자 4이상, 연속된 문자
  if(/(\w)\1\1\1/.test(upw) || isContinuedValue(upw))
  {
	  if (upw=="") return false;
      alert("비밀번호에 4자 이상의 연속 또는 반복 문자 및 숫자를 사용하실 수 없습니다."); 
	      obj.focus();
	      return false;
  }	     
  // 아이디 포함 여부
  if(newPassword1.search(id)>-1)
  {
	  if (upw=="") return false;
      alert("ID가 포함된 비밀번호는 사용하실 수 없습니다."); 
	      obj.focus();
	      return false;
  }	     
  
}

/******************************************************************************
 * Function Name : checkAll
 * idStr          : 전체 선택 첵크박스 id
 * inputNameStr    	 : 첵크되어야할 첵크박스 name
 * Description   : idStr 의 첵크 여부를 기준으로 inputNameStr 의 첵크박스 들을 전체 선택 or 전체 비선택 처리함.
 *****************************************************************************/
function checkAll(idStr , inputNameStr){
    var isChecked = false;
    if( $('input:checkbox[id="' + idStr + '"]').is(":checked") == true ){
        isChecked = true;
    }
    if( isChecked ){
        // 체크 박스 모두 체크
        $("input[name=" + inputNameStr + "]:checkbox").each(function() {
//				$(this).attr("checked", true);
            this.checked=true;
        });
    }else{
        // 체크 박스 모두 해제
        $("input[name=" + inputNameStr + "]:checkbox").each(function() {
//				$(this).attr("checked", false);
            this.checked=false;
        });
    }
}


/******************************************************************************
 * Function Name : getCheckedVal
 * inputNameStr    	 : 첵크되어야할 첵크박스 name
 * Description   : 첵크된 항목의 value 값을 ","  구분자로 붙여서 return 한다.
 *****************************************************************************/
function getCheckedVal(inputNameStr) {

    var checkedVals="";
    // 체크 되어 있는 값 추출
    $("input[name=" + inputNameStr + "]:checked").each(function() {
        var test = $(this).val();
        console.log(test);
        if( "" != checkedVals ){
            checkedVals = checkedVals + "," + test;
        }else{
            checkedVals = checkedVals + test;
        }
    });
    return checkedVals;
}
function getCheckedCnt(inputNameStr) {

    var checkedCnt = 0;
    // 체크 되어 있는 값 추출
    $("input[name=" + inputNameStr + "]:checked").each(function() {
        ++checkedCnt;
    });
    return checkedCnt;
}

/** 사업자번호 유효성체크 000-00-00000 **/
function checkBizID(bizID) {
	//bizID = replaceAll(bizID, "-", "");
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var tmpBizID, i, chkSum=0, c2, remander;
    var result;
     
    bizID = bizID.replace(/-/gi,'');
 
    for (i=0; i<=7; i++) {
        chkSum += checkID[i] * bizID.charAt(i);
    }
 
    c2 = "0" + (checkID[8] * bizID.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10 ;
 
    if (Math.floor(bizID.charAt(9)) == remander) {
        result = true ; // OK!
         
    } else {
        result = false;
         
    }
   
    return result;
}


function replaceAll(str, searchStr, replaceStr) {
	if (str != '' && str != null) {
	    while (str.indexOf(searchStr) != -1) {
	        str = str.replace(searchStr, replaceStr);
	    }
	}
    return str;

}


function hangul(obj)
{
	if((event.keyCode < 12592) || (event.keyCode > 12687)) {
		obj.value = "";
	}
	
}
var layer = {
		showLayer : function(layerId, clickObj){
			
			
			var background = "<div class='c-popup-layer-background'>&nbsp;</div>"
			
			
			var offsets = $(clickObj).offset();
			var height = $(clickObj).height();
			var width = $(clickObj).width();
			
			
			var $layerObj = $("#" + layerId); 
			$layerObj.before(background);
			
			$layerObj.css("top",(offsets.top-height - 55) + "px");
			$layerObj.css("left",(offsets.left+width + 30) + "px");
			$layerObj.show();
			
			
			$layerObj.find(".c-popup-close").on("click", function(e){
				$layerObj.hide();
				$(".c-popup-layer-background").remove();
			})
			
			$(".c-popup-layer-background").on("click", function(e){
				$layerObj.hide();
				$(".c-popup-layer-background").remove();
			})
			
			$(document).keyup(function(e) {
			    
			    if(e.which == 27){
			    	$layerObj.hide();
					$(".c-popup-layer-background").remove();
			    }
			});
			
		}
		
}
