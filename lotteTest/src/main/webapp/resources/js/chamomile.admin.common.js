var admin = {
		
	url : {
		languageList : "/i18n/admin/languageList"
	},	
	
	
	init : function(){
		admin._getLanguageList();
		admin._geni18nLogoutHeader();
		admin._geni18nHelpCenterHeader();
		
		cmmlObj = {};
		cmmlObj._msg400 = jQuery.i18n.prop("http.message.400");
		cmmlObj._msg404 = jQuery.i18n.prop("http.message.404");
		cmmlObj._msg401 = jQuery.i18n.prop("http.message.401");
		cmmlObj._msg403 = jQuery.i18n.prop("http.message.403");	
		cmmlObj._msg500 = jQuery.i18n.prop("http.message.403");
		cmmlObj._msgErr1 = jQuery.i18n.prop("http.message.unknown");
		cmmlObj._msgErr2 = jQuery.i18n.prop("http.message.unknown");
		cmmlObj._msgErr3 = jQuery.i18n.prop("http.message.unknown");
		
		
		cmml._init(cmmlObj);
		
		
		
	},

	_getLanguageList: function(){
		
		cmml._ajaxAsync(admin.url.languageList, {}, admin._genLanguageSelector);
		
	},
	
	_genLanguageSelector : function(data){
		
		var html = "<select id='_selectLanguage'  onchange='cmml._changeLanguage(this)' style='margin-top: 14px;'> ";
		html += "	<option value = ''>" + jQuery.i18n.prop("screen.header.select.item.language") + "</option> ";
			
			for (var i=0 ; i < data.languageList.length ; i++){
				
				var langCode = data.languageList[i].languageCode + "_" + data.languageList[i].countryCode;
				
				html += " <option value='" +langCode + "' ";                        
				if ((data.languageCode + "_" + data.countryCode) == langCode){
					html += " selected ";
				}						
				html += ">" + data.languageList[i].description + "</option>";
			}			
		html += "	</select>";
		
		$("#_lanuageSelector").html(html); 
	},
	
	//헤더의 로그아웃에 대한 다국어 처리
	_geni18nLogoutHeader : function(){
		$("#_logout").html("<i class='fa fa-sign-out'/>"+jQuery.i18n.prop("logout.title"));
	},
	
	//헤더의 도움말에 대한 다국어 처리
	_geni18nHelpCenterHeader : function(){
		$("#_helpcenter").html("<i class='fa fa-question-circle'/>"+jQuery.i18n.prop("helpcenter.title"));
	},
	
	_setSearchEvent : function(){
		$("#searchForm input[type=text]").keypress(function( event ) {
			  if ( event.which == 13 ) {
				  event.preventDefault();				     
				  $("#searchForm button").click();				     
			  }
		});		
	},
	
	_setRequiredFields : function(){
		cmml.setRequiredMark(".admin-required");
	}
}

$(function() {
	
	if ($("#_lanuageSelector").length > 0){
		jQuery.i18n.properties({
		    name:'message-common',
		    path:'/i18n/all/',
		    mode:'map',
		    language:'NA',
		    callback: function () {	    	
		    	admin.init();
		    }	
		});
		
		cmml._makeWaitingCircle();
	}	
	
	admin._setSearchEvent();
	admin._setRequiredFields();
	$.fn.modal.prototype.constructor.Constructor.DEFAULTS.backdrop = 'static';
	$.fn.modal.prototype.constructor.Constructor.DEFAULTS.keyboard = false;

	
})