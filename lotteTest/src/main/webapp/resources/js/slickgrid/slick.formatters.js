/***
 * Contains basic SlickGrid formatters.
 * 
 * NOTE:  These are merely examples.  You will most likely need to implement something more
 *        robust/extensible/localizable/etc. for your use!
 * 
 * @module Formatters
 * @namespace Slick
 */

(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Formatters": {
        "PercentComplete": PercentCompleteFormatter,
        "PercentCompleteBar": PercentCompleteBarFormatter,
        "YesNo": YesNoFormatter,
        "Checkmark": CheckmarkFormatter,
        "Checkbox": CheckboxFormatter,
        "EditControlPanel" : EditControlPanel, /* custom */
        "TextEditor" : TextEditor, /* custom */
        "SelectEditor" : SelectEditor /* custom */
        
        
      }
    }
  });
  
  
  /* custom */
  function EditControlPanel(row, cell, value, columnDef, dataContext){
	  if (value == null || value === "") {
	      return "";
	  }
	  
	  var html = "<div class='slickgrid-inner-editable-layer'>" +
	  				"<span class='value-area'>" +
	  					"<button class='" + value.editClassName + "' rownum='" + row + "' type='button' onclick='" + value.editclick + "(this)'>" + value.editText + "</button>" +
	  				"</span>" +
	  				"<span class='editor-area'>" +
	  					"<button class='" + value.saveClassName + "' rownum='" + row + "' type='button' onclick='" + value.saveclick + "(this)'>" + value.saveText + "</button>&nbsp;" +
	  					"<button class='" + value.cancelClassName + "' rownum='" + row + "' type='button' onclick='" + value.cancelclick + "(this)'>" + value.cancelText + "</button>" +
	  				"</span>" +
	  			"</div>";
	  
	  return html;
  }
  
  
  /* custom */
  function TextEditor(row, cell, value, columnDef, dataContext){
	  if (value == null || value === "") {
	      return "";
	  }
	  
	  var valueStyle = "";
	  var editorStyle = ""
	  
	  if (value.showEditorAtInit){
		  valueStyle = "style='display:none'";
		  editorStyle = "style='display:block'"
	  }
	  
	  
	  var html = "<div class='slickgrid-inner-editable-layer'>" +
		  				"<span class='value-area' " + valueStyle + ">" + value.text + "</span>" +
		  				"<span class='editor-area' " + editorStyle + ">" +
		  					"<input type='text' onclick='event.stopPropagation();' class='" + value.className + "' rownum='" + row + "'value='" + value.text + "'/>" +
		  				"</span>" +
		  			"</div>"; 
	  return html;
  }
  
  /* custom */
  function SelectEditor(row, cell, value, columnDef, dataContext){
	  if (value == null || value === "") {
	      return "";
	  }
	  
	  var valueStyle = "";
	  var editorStyle = ""
	  
	  if (value.showEditorAtInit){
		  valueStyle = "style='display:none'";
		  editorStyle = "style='display:block'"
	  }
	  
	  
	  var html = "<div class='slickgrid-inner-editable-layer'>";
	  html += "<span class='value-area' " + valueStyle + ">" + value.text + "</span>";
	  html += "<span class='editor-area' " + editorStyle + ">";
	  html += "<select  onclick='event.stopPropagation();' class='" + value.className + "' rownum='" + row + "'>";	  
	  for (var i = 0 ; i < value.element.length ; i++){
		  html += "<option value='" + value.element[i].value + "'";
		  if (value.element[i].value == value.selectedValue){
			 html += " selected ";
		  }
		  html += ">" + value.element[i].text + "</option>";
	  }
	  html += "</select>";	  
		  					
		  					
	  html += "</span>";
      html +=   			"</div>"; 
	  return html;
  }

  function PercentCompleteFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "") {
      return "-";
    } else if (value < 50) {
      return "<span style='color:red;font-weight:bold;'>" + value + "%</span>";
    } else {
      return "<span style='color:green'>" + value + "%</span>";
    }
  }

  function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
    if (value == null || value === "") {
      return "";
    }

    var color;

    if (value < 30) {
      color = "red";
    } else if (value < 70) {
      color = "silver";
    } else {
      color = "green";
    }

    return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
  }

  function YesNoFormatter(row, cell, value, columnDef, dataContext) {
    return value ? "Yes" : "No";
  }

  function CheckboxFormatter(row, cell, value, columnDef, dataContext) {
    return '<img class="slick-edit-preclick" src="../../images/slickgrid/' + (value ? "CheckboxY" : "CheckboxN") + '.png">';
  }

  function CheckmarkFormatter(row, cell, value, columnDef, dataContext) {
    return value ? "<img src='../../images/slickgrid/tick.png'>" : "";
  }
})(jQuery);
