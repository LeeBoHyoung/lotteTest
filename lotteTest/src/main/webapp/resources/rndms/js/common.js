
// 계열사 정보 -2
function renderCompanyList(selectTagId, check){

	$.ajax({
			url: "/rndms/app/companyList",
			contentType : 'application/json',
			method: "POST",
		    dataType: "json",
		    async: false,
			success: function(data) {
					var companyList = data;				
					var $select = selectTagId;

					if(check==1){ var optionList = '<option value="" disabled selected>계열사를 선택해주세요.</option>'; }	
					else { var optionList = '';}

				    $.each(companyList, function(key, value){
				    	optionList += '<option value="' + this.companyName + '" >'+ this.companyName +'</option>';
				        $select.html(optionList);
				    });
				   
					var data = companyList.map(function(v){	    
					    return {id: v.companyName,
				    	    	text: v.idx + v.companyName,	    
					    	    html:  '<div class="profile_div">'
					    	    	  +'<h6>' + v.companyName + '</h6>'  
					    	    	  +'</div>',
					    	    title : v.idx + v.companyName
					    };
					});
					
				    $select.select2({
				        data: data,
				        escapeMarkup: function(markup) {
				          return markup;
				        },
				        templateResult: function(data) {
				          return data.html;
				        },
				        templateSelection: function(data) {
				          return data.text;
				        }
				    });
				    
				    $select.on('select2:open', function (e) {
				    	$('body').perfectScrollbar('destroy');
			    	});
				    
				    $select.on('select2:close', function (e) {
				    	$('body').perfectScrollbar({
					        suppressScrollX: true
					      });
				    	$('body').perfectScrollbar('destroy');
			    	});
				    
				    $($select).material_select();
			},
			error: function(xhr) {
				alert("ajax error: " + xhr.statusText);
			}
		});	
		
		     
	}




//팀 정보 호출
function renderTeamList (selectTagId, teamList) {
	$.ajax({
		url: "/rndms/app/teamList",
		contentType : 'application/json',
		method: "POST",
		async: false,
	    dataType: "json",
		success: function(data) {
				console.log(data);
				var teamList = data;
				var teamListTree = listToTree(teamList);
				var $select = selectTagId;
				var optionList = '<option value="" disabled selected>팀/담당을 선택해주세요.</option>';
			    $.each(teamListTree[0].children, function(key, value){
			    	optionList += '<option value="' + this.idx + '" >'+ this.teamName +'</option>';
			        $.each(this.children, function(key, value){
			        	optionList += '<option value="' + this.idx + '" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ this.teamName +'</option>';
			        	$.each(this.children, function(key, value){
			            	optionList += '<option value="' + this.idx + '" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ this.teamName +'</option>';
			            });
			        });
			        $select.html(optionList);
			    });

				
			    $($select).material_select();
			    
			    $($select).on("change", function() {
			        $($select).siblings(".select-dropdown").val($.trim($($select).siblings('.select-dropdown').val()));
			    });
		},
		error: function(xhr) {
			alert("ajax error: " + xhr.statusText);
		}
	});
	
	
}

//팀 정보 호출
function renderBusinessTeamList (selectTagId, teamList) {
	$.ajax({
		url: "/rndms/app/businessTeamList",
		contentType : 'application/json',
		method: "POST",
		async: false,
	    dataType: "json",
		success: function(data) {
				var teamList = data;
				var teamListTree = listToTree(teamList);
				var $select = selectTagId;
				var optionList = '<option value="" disabled selected>팀/담당을 선택해주세요.</option>';
			    $.each(teamListTree[0].children, function(key, value){
			    	optionList += '<option value="' + this.idx + '" >'+ this.teamName +'</option>';
			        $.each(this.children, function(key, value){
			        	optionList += '<option value="' + this.idx + '" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ this.teamName +'</option>';
			        	$.each(this.children, function(key, value){
			            	optionList += '<option value="' + this.idx + '" >&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'+ this.teamName +'</option>';
			            });
			        });
			        $select.html(optionList);
			    });

				
			    $($select).material_select();
			    
			    $($select).on("change", function() {
			        $($select).siblings(".select-dropdown").val($.trim($($select).siblings('.select-dropdown').val()));
			    });
		},
		error: function(xhr) {
			alert("ajax error: " + xhr.statusText);
		}
	});
}


function listToTree(arr){
	var tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;
	
	// First map the nodes of the array to an object -> create a hash table.
	for(var i = 0, len = arr.length; i < len; i++) {
	  arrElem = arr[i];
	  mappedArr[arrElem.idx] = arrElem;
	  mappedArr[arrElem.idx]['children'] = [];
	}	
	
	for (var idx in mappedArr) {
	  if (mappedArr.hasOwnProperty(idx)) {
	    mappedElem = mappedArr[idx];
	    if(mappedElem.useYn == 1){
	    	// If the element is not at the root level, add it to its parent array of children.
		    if (mappedElem.parentTeamIdx) {
		      mappedArr[mappedElem['parentTeamIdx']]['children'].push(mappedElem);
		    }
		    // If the element is at the root level, add it to first level elements array.
		    else {	      
		      tree.push(mappedElem);
		    }
	    }	    
	  }
	}
	return tree;
}

function makeCodeForJsgrid(code){
	var newCode = [{"Name": "전체", "Id": ""}];
	
	var newCode2 = newCode.concat(code.map(function(v){	    
	    return {"Name": v.codeDesc, "Id": v.realValue};
	}));
	return newCode2;
};

//사용자 리스트 렌더
function renderUserList (selectTagId, check, all) {	
	
	$.ajax({
		url: "/rndms/app/userList",
		contentType : 'application/json',
		method: "POST",
	    dataType: "json",
	    async: false,
		success: function(data) {
				console.log(data);
				var userList = [];
				var temp = [];
				if(all == 1) { // 사용자 관리의 유저리스트
						userList = data;
					} 
				else { // 기본 유저리스트
					$.each(data, function(i,v){
							temp.push(v);
							userList = temp;
						});
					}

				var $select = selectTagId;

				if(check==1){ var optionList = '<option value="" disabled selected>사용자를 선택해주세요.</option>'; }	
				else { var optionList = '';}

			    $.each(userList, function(key, value){
			    	optionList += '<option value="' + this.userId + '" >'+ this.name +'</option>';
			        $select.html(optionList);
			    });
			   
				var data = userList.map(function(v){	    
				    return {id: v.userId,
			    	    	text: v.name + v.teamName + v.grade + v.position,	    
				    	    html:  '<div class="profile_div">'
				    	    	  +'<img src="'+v.profileImgPath+v.profileImgName+'" class="circle profile_img indigo lighten-3">'
				    	    	  +'<h6>' + v.name + ' ' + v.grade + ' (' + v.userId + ') ' + '</h6>'  
				    	    	  +'<p>' + v.teamName + ' ' + v.position + '</p>'
				    	    	  +'</div>',
				    	    title : v.name + v.teamName
				    };
				});
				
			    $select.select2({
			        data: data,
			        escapeMarkup: function(markup) {
			          return markup;
			        },
			        templateResult: function(data) {
			          return data.html;
			        },
			        templateSelection: function(data) {
			          return data.text;
			        }
			    });
			    
			    $select.on('select2:open', function (e) {
			    	$('body').perfectScrollbar('destroy');
		    	});
			    
			    $select.on('select2:close', function (e) {
			    	$('body').perfectScrollbar({
				        suppressScrollX: true
				      });$('body').perfectScrollbar('destroy');
		    	});
			    
			    $($select).material_select();
		},
		error: function(xhr) {
			alert("ajax error: " + xhr.statusText);
		}
	});	
	
	     
}

//프로젝트 사용자 리스트 렌더
function renderProjectUserList (selectTagId, data) {    
    var userList = data;                
    var $select = selectTagId;
    var optionList = '';
    optionList = '<option value="" disabled selected>사용자를 선택해주세요.</option>';
    
    $.each(userList, function(key, value){
        optionList += '<option value="' + this.userId + '" >'+ this.name +'</option>';
        $select.html(optionList);
    });
   
    var data = userList.map(function(v){        
        return {id: v.userId,
                text: v.name + v.teamName + v.grade + v.position,        
                html:  '<div class="profile_div">'
                      +'<img src="'+v.profileImgPath+v.profileImgName+'" class="circle profile_img indigo lighten-3">'
                      +'<h6>' + v.name + ' ' + v.grade + ' (' + v.nickname + ') ' + '</h6>'  
                      +'<p>' + v.teamName + ' ' + v.position + '</p>'
                      +'</div>',
                title : v.name + v.teamName
        };
    });
    
    
    $select.select2({
        data: data,
        escapeMarkup: function(markup) {
          return markup;
        },
        templateResult: function(data) {
          return data.html;
        },
        templateSelection: function(data) {
          return data.text;
        }
    });
    
    
    $($select).material_select();         
}

//프로젝트 사용자 리스트 렌더
function renderInventionUserList (selectTagId, data) {    
    var userList = data;                
    var $select = selectTagId;
    var optionList = '';
    
    $.each(userList, function(key, value){
        optionList += '<option value="' + this.userId + '" >'+ this.name +'</option>';
        $select.html(optionList);
    });
   
    var data = userList.map(function(v){        
        return {id: v.userId,
                text: v.name + v.teamName + v.grade + v.position,        
                html:  '<div class="profile_div">'
                      +'<img src="'+v.profileImgPath+v.profileImgName+'" class="circle profile_img indigo lighten-3">'
                      +'<h6>' + v.name + ' ' + v.grade + ' (' + v.nickname + ') ' + '</h6>'  
                      +'<p>' + v.teamName + ' ' + v.position + '</p>'
                      +'</div>',
                title : v.name + v.teamName
        };
    });
    
    data.unshift({
            html: '<div class="profile_div"><h6>### 직접 입력 ### </h6></div>',
            id: '0',
            text: '### 직접 입력 ###',
            title: '### 직접 입력 ###'
    });
    
    $select.select2({
        data: data,
        escapeMarkup: function(markup) {
          return markup;
        },
        templateResult: function(data) {
          return data.html;
        },
        templateSelection: function(data) {
          return data.text;
        }
    });
    
    
    $($select).material_select();         
}


function validateApprovalList() {
	var list = JSON.parse($('#approval').val());
	var length = list.length;
	if(length != 0) {
		if((list[length-1].type == 2) && (list[length-1].id == 11)) {
			return true;
		}else {
			return false;
		}
	}
}

function initNestable(approvalList){
	$(".nestable-delete").off("click");	
	
	var output = '';
    $.each(approvalList, function (index, item) {
        output += buildItem(item.id, item.text, item.type, item.approvedYn);
    });

    $('.dd-list').html(output);		    
    $('.dd').nestable({
    	maxDepth:1,
    	callback: function(l,e){
           deleteItemEventBind();
        }
    });
    
    deleteItemEventBind();
    
    var approvalJSON = JSON.stringify($('.dd').nestable('serialize'));
	$('#approval').val(approvalJSON);
    
    $('.dd').bind('DOMSubtreeModified', function(e){
    	var approvalJSON = JSON.stringify($('.dd').nestable('serialize'));
    	$('#approval').val(approvalJSON);
    });
	
	$('#addApprover').unbind("click").click(function(){
		$('.dd-empty').remove();
		
		var approverId = $('#approverId').val();
		var approverText = $('#approverId option:selected').text(); 

						
		if(updateModeState && (approverId != null) && checkDuplicate(1, approverId)) {
			$('.dd-list').append(buildItem(approverId, approverText, "1"));
			deleteItemEventBind();
		}
	});			
	
	$('#addApproveTeam').unbind("click").click(function(){
		$('.dd-empty').remove();
		
		var approveTeamIdx = $('#approveTeamIdx').val();
		var approveTeamText = $('#approveTeamIdx option:selected').text().trim();
						
		if(updateModeState && (approveTeamIdx != null) && checkDuplicate(2, approveTeamIdx)) {
			$('.dd-list').append(buildItem(approveTeamIdx, approveTeamText, "2"));	
			deleteItemEventBind();
		}				
	});
	
	
	
	function buildItem(id, text, type, approvedYn) {
		var color = "";
		if(approvedYn == "1") {
			color = "green lighten-3";
		}
		if(approvedYn == "2") {
			color = "red lighten-3";
		}
			
        var html = "<li class='dd-item' data-id='" + id + "' data-type='"+type+"'>";
        html += "<div class='nest-handle dd-handle "+ color +"'>" + text
        		+ "</div><span class='nestable-delete'><i class='material-icons'>cancel</i></span></li>";
        return html;
    }
    
    function deleteItemEventBind() {
    	$(".dd").find(".nestable-delete").on("click", function(e) {
    		if(updateModeState){
    			if(($(this).parent().data("id") == 11) && ($(this).parent().data("type") == 2)) {
    				e.stopPropagation();
    				Materialize.toast('DT기획담당은 삭제할 수 없습니다.', 4000);
    			}else {
    				$('.dd').nestable('remove', $(this).parent().data("id"));	
    			}    				
    		}		        	
        });		  
    }
    
    function checkDuplicate(type, id) {
    	var approvalJSON = $('.dd').nestable('serialize');
    	var result = true;		    	
    	$.each(approvalJSON,function(i, v){
    		if((approvalJSON[i].type == type) && (approvalJSON[i].id.toString() == id.toString())) {
    			result = false;
    		}		    		
    	});		    	
    	return result;
    }
	
}