var cmml = {
	_msg400 : "",
	_msg404 : "",
	_msg401 : "",
	_msg403 : "",	
	_msg500 : "",
	_msgErr1 :"",
	_msgErr2 : "",
	_msgErr3 : "",
	
	$400 : '400',
	$401 : '401',
	$403 : '403',
	$404 : '404',
	$500 : '500',
	
	
	_init : function(obj){ //에러메시지를 정의 해주어야 한다.
		cmml._msg400 = obj._msg400;
		cmml._msg404 = obj._msg404;
		cmml._msg401 = obj._msg401;
		cmml._msg403 = obj._msg403;
		cmml._msg500 = obj._msg500;	
		cmml._msgErr1 = obj._msgErr1;
		cmml._msgErr2 = obj._msgErr2;
		cmml._msgErr3 = obj._msgErr3;
	},
	_changeLanguage : function(obj){
		if ($(obj).val() == ""){
			
		}else{
			
			var languageCode = $(obj).val().split("_");			
			
			location.href="/admin/common/locale?language=" + languageCode[0] + "&country=" + languageCode[1] + "&url=" + window.location.pathname;
		}
	},
	_ajaxSync : function(url, jsonObj, successCallback, errorCallback){
		cmml._showWaiting();
		$.ajax(
				{
					beforeSubmit : "",
					url : url,					
					type : "post", // get, post 
					dataType : "json", // xml, html, script, json 
					data : JSON.stringify(jsonObj),
					contentType : "application/json; charset=UTF-8",
					async: false,
					statusCode :{
						404:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$404, rstData);
							}else{
								alert(cmml._msg404)
							}
						},
						401:function(){
							alert(cmml._msg401);
							location.href="/login";
						},
						403:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$403, rstData);
							}else{
								alert(cmml._msg403)
							}
						},
						400:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$400, rstData);
							}else{
								alert(cmml._msg400)
							}
						},
						500:function(rstData){
							cmml._hideWaiting();
							if ($("#exceptionMessage").length > 0){
								if(rstData.responseJSON.sendGbn == 0){
									$("#exceptionDetailMessage").modal("show");
									$('#exceptionMsg2').val(rstData.responseJSON.message);
									$('#exceptionDetailMsg').val(rstData.responseJSON.detailmessage);
								}else {
									$("#exceptionMessage").modal("show");
									$('#exceptionMsg1').val(rstData.responseJSON.message);									
								}
							}
							
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$500, rstData);
							}else{
								alert(cmml._msg500)
							}
						}
					},
					success : function(rstData, status) {
						cmml._hideWaiting();
						successCallback(rstData, status)
					},
					error : function() {
						cmml._hideWaiting();
						//alert(cmml._msgErr2);
					}
				});	
	},
	_ajaxAsync : function (url, jsonObj, successCallback, errorCallback){
		cmml._showWaiting();
		$.ajax(
				{
					beforeSubmit : "",
					url : url,					
					type : "post", // get, post 
					dataType : "json", // xml, html, script, json 
					data : JSON.stringify(jsonObj),
					contentType : "application/json; charset=UTF-8",
					async: true,
					statusCode :{
						404:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$404, rstData);
							}else{
								alert(cmml._msg404)
							}
						},
						401:function(){
							alert(cmml._msg401);
							location.href="/login";
						},
						403:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$403, rstData);
							}else{
								alert(cmml._msg403)
							}
						},
						400:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$400, rstData);
							}else{
								alert(cmml._msg400)
							}
						},
						500:function(rstData){
							cmml._hideWaiting();
							if ($("#exceptionMessage").length > 0){
								if(rstData.responseJSON.sendGbn == 0){
									$("#exceptionDetailMessage").modal("show");
									$('#exceptionMsg2').val(rstData.responseJSON.message);
									$('#exceptionDetailMsg').val(rstData.responseJSON.detailmessage);
								}else {
									$("#exceptionMessage").modal("show");
									$('#exceptionMsg1').val(rstData.responseJSON.message);									
								}
							}
							
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$500, rstData);
							}else{
								alert(cmml._msg500)
							}
						}
					},
					success : function(rstData, status) {
						cmml._hideWaiting();
						successCallback(rstData, status)
					},
					error : function() {
						cmml._hideWaiting();
						//alert(cmml._msgErr2);
					}
				});	
	},
	_ajaxFormAsync : function (container, url, successCallback, extra, errorCallback){
		cmml._showWaiting();
		$(container)
			.ajaxSubmit(
				{
					beforeSubmit : "",
					url : url,
					contentType : "application/x-www-form-urlencoded;charset=UTF-8",
					type : "post", // get, post 
					dataType : "json", // xml, html, script, json
					statusCode :{
						404:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$404);
							}else{
								alert(cmml._msg404)
							}
						},
						401:function(rstData){
							cmml._hideWaiting();
							alert(cmml._msg401, rstData);
							location.href="/login";
						},
						403:function(){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$403);
							}else{
								alert(cmml._msg403)
							}
						},
						400:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$400, rstData);
							}else{
								alert(cmml._msg400)
							}
						},
						500:function(rstData){
							cmml._hideWaiting();
							
							if ($("#exceptionMessage").length > 0){
								if(rstData.responseJSON.sendGbn == 0){
									$("#exceptionDetailMessage").modal("show");
									$('#exceptionMsg2').val(rstData.responseJSON.message);
									$('#exceptionDetailMsg').val(rstData.responseJSON.detailmessage);
								}else {
									$("#exceptionMessage").modal("show");
									$('#exceptionMsg1').val(rstData.responseJSON.message);									
								}
							}
							
							if (typeof errorCallback !== "undefined"){
								//errorCallback($500, rstData);
							}else{
								//alert(cmml._msg500)
							}
							
							
						}
					},
					success : function(rstData, status) {
						cmml._hideWaiting();
						successCallback(rstData, status, extra);
					},
					error : function() {
						cmml._hideWaiting();
						//alert(cmml._msgErr3);
					}
				});
	},	
	_ajaxAsyncMethod : function (url, jsonObj, successCallback, errorCallback, method){
		cmml._showWaiting();
		$.ajax(
				{
					beforeSubmit : "",
					url : url,					
					type : method, // get, post 
					dataType : "json", // xml, html, script, json 
					data : jsonObj,
					contentType : "application/json; charset=UTF-8",
					async: true,
					statusCode :{
						404:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$404, rstData);
							}else{
								alert(cmml._msg404)
							}
						},
						401:function(){
							alert(cmml._msg401);
							location.href="/login";
						},
						403:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$403, rstData);
							}else{
								alert(cmml._msg403)
							}
						},
						400:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$400, rstData);
							}else{
								alert(cmml._msg400)
							}
						},
						500:function(rstData){
							cmml._hideWaiting();
							if ($("#exceptionMessage").length > 0){
								if(rstData.responseJSON.sendGbn == 0){
									$("#exceptionDetailMessage").modal("show");
									$('#exceptionMsg2').val(rstData.responseJSON.message);
									$('#exceptionDetailMsg').val(rstData.responseJSON.detailmessage);
								}else {
									$("#exceptionMessage").modal("show");
									$('#exceptionMsg1').val(rstData.responseJSON.message);									
								}
							}
							
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$500, rstData);
							}else{
								alert(cmml._msg500)
							}
						}
					},
					success : function(rstData, status) {
						cmml._hideWaiting();
						successCallback(rstData, status)
					},
					error : function() {
						cmml._hideWaiting();
						//alert(cmml._msgErr2);
					}
				});	
	},
	_ajaxFormAsyncMethod : function (container, url, successCallback, extra, errorCallback, method){
		cmml._showWaiting();
		$(container)
			.ajaxSubmit(
				{
					beforeSubmit : "",
					url : url,
					contentType : "application/x-www-form-urlencoded;charset=UTF-8",
					type : method, // get, post 
					dataType : "json", // xml, html, script, json
					statusCode :{
						404:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$404);
							}else{
								alert(cmml._msg404)
							}
						},
						401:function(rstData){
							cmml._hideWaiting();
							alert(cmml._msg401, rstData);
							location.href="/login";
						},
						403:function(){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$403);
							}else{
								alert(cmml._msg403)
							}
						},
						400:function(rstData){
							cmml._hideWaiting();
							if (typeof errorCallback !== "undefined"){
								errorCallback(cmml.$400, rstData);
							}else{
								alert(cmml._msg400)
							}
						},
						500:function(rstData){
							cmml._hideWaiting();
							
							if ($("#exceptionMessage").length > 0){
								if(rstData.responseJSON.sendGbn == 0){
									$("#exceptionDetailMessage").modal("show");
									$('#exceptionMsg2').val(rstData.responseJSON.message);
									$('#exceptionDetailMsg').val(rstData.responseJSON.detailmessage);
								}else {
									$("#exceptionMessage").modal("show");
									$('#exceptionMsg1').val(rstData.responseJSON.message);									
								}
							}
							
							if (typeof errorCallback !== "undefined"){
								//errorCallback($500, rstData);
							}else{
								//alert(cmml._msg500)
							}
							
							
						}
					},
					success : function(rstData, status) {
						cmml._hideWaiting();
						successCallback(rstData, status, extra);
					},
					error : function() {
						cmml._hideWaiting();
						//alert(cmml._msgErr3);
					}
				});
	},
	_validateAddMethods : function(){	//depends on validate
	
		
		//한글 2byte체크
		$.validator.addMethod("maxlength4mbcs", function(value, element, param) {
											var maxlen = parseInt(param);
											return (cmml._getByteLength(value) <= maxlen)
										});
										
										//한글 2byte체크
		$.validator.addMethod("minlength4mbcs", function(value, element, param) {
											var minlen = parseInt(param);
											return (cmml._getByteLength(value) >= minlen)
										});
										
		//주민등록번호
		$.validator.addMethod("rrn", function(value, element) {							
			 
											
											var reg = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/
											return this.optional(element) || reg.test(value);
											
											
										});
		
		//이메일
		$.validator.addMethod("email", function(value, element, param) {
											
											var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
											return this.optional(element) || reg.test(value);
											
										});
										
		//전화번호
		$.validator.addMethod("phone", function(value, element, param) {
			
			
											
											var reg = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/
											return this.optional(element) || reg.test(value);
																						
										});	
		//전화번호
		$.validator.addMethod("dateEx", function(value, element, param) {
			
			
											
											return this.optional( element ) 
											|| /^\d{4}[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])$/.test( value )											
											|| /^\d{4}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$/.test( value );
											
																						
										});	
		
		$.validator.addMethod("greaterThan", function(value, element, param) {
			 if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(param).val());
			    }

			    return isNaN(value) && isNaN($(param).val()) 
			        || (Number(value) > Number($(param).val()));  
		});
		
		$.validator.addMethod("greaterThanToday", function(value, element) {
			return new Date() < new Date(value);
		});
		
		//비밀번호
		$.validator.addMethod("accountpassword", function(value, element, param) {
			/*
			{
				minlength : 8,
				uppper: true;
				letter: true;
				number: true;
				specialchar: true;
				repeatcount : 4
				excludeValue : ['#userId','#userName']
			}
			*/
											//요청된 길이보다 짧으면 return
											if (value.length < param.minlength){	
												console.log("길이짧음")
												return false;
											}
											//숫자가 없으면 리턴
											if (param.number && value.search(/[0-9]/g) < 0){												
												console.log("숫자없음")
												return false;
											}
											//문자가 없으면 리턴
											if (param.letter && value.search(/[a-zA-Z]/ig) < 0){
												console.log("문자없음")
												return false;
											}
											
											//대문자가 없으면 리턴
											if (param.uppper && value.search(/[A-Z]/g) < 0){
												console.log("대문자없음")
												return false;
											}
											
											//특수문자가 없으면 리턴
											if (param.uppper && value.search(/[#?!@$%^&*-]/ig) < 0){
												console.log("특수문자없음")
												return false;
											}
											
											var excludeValue = param.excludeValue;
											//포함시키지 않을 문자열체크
											for (var i = 0; i < excludeValue.length ; i++){
												
												if($(excludeValue[i]).val() != "" && value.search($(excludeValue[i]).val()) > -1){
													console.log("미포함 문자열포함됨")
													return false;
												}
											}
											
											//반복문자 금지
											if (param.repeatcount > 0){
												
												var lastChar = '';
												var repeatCnt = 0;
												for (var i = 0; i < value.length ; i++){
													if (lastChar == value.charAt(i)){
														repeatCnt ++;
													}else{
														repeatCnt = 0;
													}
													
													if (repeatCnt >= (param.repeatcount-1)){
														console.log("같은문자 반복됨")
														return false;
													}
													
													lastChar = value.charAt(i)
												}
											}
											
											return true;
																						
										});	
		//비밀번호
		$.validator.addMethod("accountid", function(value, element, param) {
			/*
			{
				minlength : 8,
				excludeString: ['root','admin','select']	
				excludeValue : ['#birth','#userName']				
			}
			*/
											//요청된 길이보다 짧으면 return
											if (value.length < param.minlength){												
												return false;
											}
											
											var excludeString = param.excludeString;
											//포함시키지 않을 문자열체크
											for (var i = 0; i < excludeString.length ; i++){
												
												if(value.search(excludeString[i]) > -1){
													return false;
												}
											}
											var excludeValue = param.excludeValue;
											//포함시키지 않을 문자열체크
											for (var i = 0; i < excludeValue.length ; i++){
												
												if(value.search($(excludeValue[i]).val()) > -1){
													return false;
												}
											}											
											return true;
																						
										});	
		
	},
	_getByteLength : function(str){
		/*
		var retCode = 0;
		var strLength = 0;

		for (i = 0; i < str.length; i++)
		{
			var code = str.charCodeAt(i)
			var ch = str.substr(i,1).toUpperCase()

			code = parseInt(code)

			if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0))){
				strLength = strLength + 2;
			}else{
				strLength = strLength + 1;
			}
		}
		return strLength;
		*/
		return str.length;
	},
	
	_inputmaskExtendDefinitions : function(){
		
		  
  	},	
	_subStringByte : function(str, maxByte){
		
		if (str == null || str.length == 0) {
			return 0;
		}
		var size = 0;
		var rIndex = str.length;

		for ( var i = 0; i < str.length; i++) {
			size += this._charByteSize(str.charAt(i));
			if( size == maxByte ) {
				rIndex = i + 1;
				break;
			} else if( size > maxByte ) {
				rIndex = i;
				break;
			}
		}

		return str.substring(0, rIndex);


	},
	_charByteSize : function(ch) {

		if (ch == null || ch.length == 0) {
			return 0;
		}

		var charCode = ch.charCodeAt(0);

		if (charCode <= 0x00007F) {
			return 1;
		} else if (charCode <= 0x0007FF) {
			return 2;
		} else if (charCode <= 0x00FFFF) {
			return 3;
		} else {
			return 4;
		}
	},
	_masking : {	//depends on imputmask
		onlyEng : function(obj){
			$(obj).keyup(function(event) {
	            if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
	                var inputVal = $(this).val();
	                $(this).val(inputVal.replace(/[^(a-zA-Z)]/gi, ''));
	             }
	          });
		},
		numeric : function(obj, maxlength){
			
			if (isNaN(maxlength)){
				maxlength = 100;
			}
			
			$(obj).inputmask("numeric", {
				autoGroup: true, 
				groupSeparator: ",", 
				digits: 0, 
				allowMinus: false,
				repeat: maxlength});
		},	
		numeric_arab : function(obj, maxlength){
			
			if (isNaN(maxlength)){
				maxlength = 100;
			}
			//groupSeparator: ".", 을 사용하기 위해서는 digits 값이 0 이어야함 
			$(obj).inputmask("numeric", {
				autoGroup: true, 
				groupSeparator: ".", 
				digits: 0, 
				allowMinus: false,
				repeat: maxlength});
		},
		numeric_digits : function(obj, maxlength, digits){
			if (isNaN(maxlength)){
				maxlength = 100;
			}
			
			if (isNaN(digits)){
				digits = 2;
			}
			
			$(obj).inputmask("numeric", {
				autoGroup: true, 
				groupSeparator: ",", 
				digits: digits, 
				allowMinus: true, 
				repeat: maxlength });
		},
		cellphone : function(obj){
			$(obj).inputmask("999-9999-9999");				
		},
		date : function(obj){
			$(obj).inputmask("datetime", {
				inputFormat : "yyyy-mm-dd"});
		},
		rrn : function(obj){ //주민번호는 가능하면 하이픈 이후 문자는 받지 않는다. 혹은 패스워드로 받는다. 아래 전부 오픈해서 사용하는 경우는 거의 없을것으로 판단된다.
			$(obj).inputmask("999999-9999999");
		},
		currency : function(obj,prefix, suffix){			
			if (typeof prefix === "undefined"){
				prefix = "";
			}
			
			if (typeof suffix === "undefined"){
				suffix = "";
			}
			$(obj).inputmask("numeric", {
				autoGroup: true, 
				groupSeparator: ",", 
				prefix : prefix + " ",
				suffix : suffix, 
				allowMinus: true});
		},currency_arab : function(obj,prefix, suffix){			
		
		
			if (typeof prefix === "undefined"){
				prefix = "";
			}
			
			if (typeof suffix === "undefined"){
				suffix = "";
			}
		
			//groupSeparator: ".", 을 사용하기 위해서는 digits 값이 0 이어야함 
			$(obj).inputmask("numeric", {
				autoGroup: true, 
				groupSeparator: ".", 
				prefix : prefix + " ",
				suffix : suffix, 
				digits: 0, 
				allowMinus: true});
		},unmask : function(obj){
			return $(obj).inputmask('unmaskedvalue');
		},email : function(obj){			
		
		
			$(obj).inputmask("email");
		}
			
	},
	date : {
		
		diff : function(fromDate, toDate){
			
			var diffDate_1 = fromDate instanceof Date ? fromDate : new Date(fromDate);
			var diffDate_2 = toDate instanceof Date ? toDate : new Date(toDate);
		 
			diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
			diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
		 
			var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
			diff = diff / (1000 * 3600 * 24);//Math.ceil(diff / (1000 * 3600 * 24));
		 
			return diff;

		},
		add : function(date, days){
			var fDt = new Date(date);
			var dayOfMonth = fDt.getDate();
			fDt.setDate(dayOfMonth + days);
			return fDt;
		},
		ISODate: function(date){
			
			var d = date instanceof Date ? date : new Date(date);
			var month = ('0' + (d.getMonth() + 1)).substr(-2,2);
			var day = ('0' + d.getDate()).substr(-2,2);
			var year = d.getFullYear();

			return year + "-" + month + "-" + day;

		}
	},
	matchCount: function(sourceStr, search){
		
		var sRegExInput = new RegExp(search, "g");    
		
		return (sourceStr.match(sRegExInput) || []).length;
	},
	showDebug: function(obj){
		var html = "<div id='__chamomile_debug__' style='font-size:10px;overflow-y:scroll;background:#eeeeee;z-index:1500; width:500px;height:300px;position:fixed;left:0px;top:0px;'></div>";
		$("body").append(html);
		$("#__chamomile_debug__").draggable();	

		var innerconsole = "";
		var target = document.getElementById(obj);
		var config = { attributes: true, childList: true, characterData: true, attributeOldValue:true, };
		
		var mutationObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				innerconsole = "attributeName : " + mutation.attributeName + "/ oldValue : " + mutation.oldValue + "/type : " + mutation.type + "<br>";
				console.log(mutation);
				$("#__chamomile_debug__").append(innerconsole);
				$("#__chamomile_debug__").scrollTop($("#__chamomile_debug__")[0].scrollHeight);
			  });
			});
		
		mutationObserver.observe(target, config);
		
	},
	cookie : { 
		
	
		setCookie : function(cname, cvalue, exdays){
			
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+ d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
		},
		getCookie : function(cname){
			
			var name = cname + "=";
			var decodedCookie = decodeURIComponent(document.cookie);
			var ca = decodedCookie.split(';');
			for(var i = 0; i <ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return "";
		},
		deleteCookie : function(name){

			var expireDate = new Date();
	  
			//어제 날짜를 쿠키 소멸 날짜로 설정한다.
			expireDate.setDate( expireDate.getDate() - 1 );
			document.cookie = name + "= " + "; expires=" + expireDate.toGMTString() + "; path=/"
		},
		listCookies : function(){		
			return document.cookie;		
		}
	},
	localStorage : {
		
		setItem : function(key, value){
			localStorage.setItem(key, value);
		},
		getItem : function(key){
			return localStorage.getItem(key);
		},
		removeItem :function(key){			
			localStorage.removeItem(key);
		}
	},
	setRequiredMark : function(className){	
		$(className).attr("title","필수값입니다.");
		$(className).append("<span class='required-mark'>(*)</span>");
	},
	replaceAll : function(sourceStr, targetStr, replaceStr){
		
		var sRegExInput = new RegExp(targetStr, "gi");    
		
		return sourceStr.replace(sRegExInput, replaceStr); 
		
	},
	
	phoneNumberFormat: function(phoneNumber) {
		return phoneNumber.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
	},
	
    serializeObject : function(formName) {
        var array = $("#" + formName).serializeArray();
        var obj = {};
        $.each(array, function() {
            var name;
            $.each(this, function(i, value){
                if (i=="name") {
                    name = value;
                } else if (i=="value") {
                    if(obj[name]) {
                        if($.isArray(obj[name])) {
                            obj[name].push(value);
                        }
                        else {
                            var objArray = new Array();
                            objArray.push(obj[name]);
                            objArray.push(value);
                            obj[name] = objArray;
                        }
                    }
                    else obj[name] = value;
                }
            });
        });
        return obj;
    },
    _makeWaitingCircle:function(){
    	$("body").append("<div class='loader' id='__wating'></div>");    	
    },
    _hideWaiting:function(){
    	$("#__wating").hide();
    },
    _showWaiting:function(){
    	$("#__wating").show();
    }
    

}

$(function() {
	
	

})