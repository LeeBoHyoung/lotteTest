var slickhelper = {

	totalCnt : 0,
	curPage : 0,
	rowPerPage : 10,
	visiblePage : 10,
	column : {},
	$grid : {},
		
	createSlickGrid : function(container, dataView, columns, options){
	
	    /**
	     * hidden옵션을 사용하기위한 custom
	     */
	    for (var colCnt = 0 ; colCnt < columns.length ; colCnt++){
	    	if (columns[colCnt].hidden){
	    		columns[colCnt].width = 0;
	    		columns[colCnt].minWidth = 0;
	    		columns[colCnt].maxWidth = 0;
	    		columns[colCnt].headerCssClass = "hide-column";
	    		columns[colCnt].cssClass = "hide-column";
	    	}
	    }
	    
	    this.column = columns;
	    
	    this.$grid = new Slick.Grid(container, dataView, columns, options); 
		return this.$grid;
	},
	checkClear : function(_grid){
		$(_grid.getContainerNode()).find(".slick-row .slick-cell-checkboxsel input[type=checkbox]").prop("checked", false);
	},
	//반환된 선택 행 번호에서 키값들을 추출한다.
	getSelectedRowsKey : function(keyIndex, data){
		return this.getSelectedRowsKey2(grid, keyIndex, data);		 
	},
	getSelectedRowsKey2 : function(grid, keyIndex, data){
		
		var keys = [];
		var selected = grid.getSelectedRows();
		for (var i = 0 ; i < selected.length ; i++){
			keys[i] = [];
			for (var z = 0 ; z < keyIndex.length ; z++){
				keys[i][keyIndex[z]] = data[selected[i]][keyIndex[z]];
			}
		}
		
		return keys; 
	},
	initPager : function(container, movePageCallback){
		
		this.initPager2(container, this.totalCnt, this.rowPerPage, movePageCallback);
		
		
	},
	
	initPager2 : function(container, totalCnt, rowPerPage, movePageCallback){
		
		var totalPage = parseInt(totalCnt / rowPerPage) + 1;
		container.twbsPagination('destroy');
		
		container.twbsPagination({
			  totalPages: totalPage,
			  visiblePages: this.visiblePage,
			  first:"<i class='fa fa-angle-double-left' aria-hidden='true'></i>",
			  prev:"<i class='fa fa-angle-left' aria-hidden='true'></i>",
			  next:"<i class='fa fa-angle-right' aria-hidden='true'></i>",
			  last:"<i class='fa fa-angle-double-right' aria-hidden='true'></i>"
			  /*onPageClick: function (event, page) {
				  movePageCallback(page, slickhelper.rowPerPage);
			  }*/
			}).on('page', function (event, page) {
				movePageCallback(page, rowPerPage);
			});
	},
	
	
	
	updatePager : function(dataView){
		
	},
	setRowClickEvent2 : function(method, _grid){
		//셀이 선택되었을때 처리
		_grid.onClick.subscribe(function (e) {
			 
			var cell = _grid.getCellFromEvent(e);
			if (!_grid.getColumns()[cell.cell].excludeEvent){
				method(e);
			}			 
			
	 	 });
	},
	setRowClickEvent : function(method){
		this.setRowClickEvent2(method, this.$grid);
	},
	enableRowEditMode : function(obj){
		$(obj).closest(".slick-row").find(".slickgrid-inner-editable-layer .value-area").hide();
		$(obj).closest(".slick-row").find(".slickgrid-inner-editable-layer .editor-area").show();
	},
	disableRowEditMode : function(obj){
		$(obj).closest(".slick-row").find(".slickgrid-inner-editable-layer .value-area").show();
		$(obj).closest(".slick-row").find(".slickgrid-inner-editable-layer .editor-area").hide();
	},
	enableRowReordering : function(_grid, _dataView, _dataFunc, afterCallback){	
		
		/*
		 * 컬럼 옵션 제일 첫번째는 아래와 같이 정의 합니다.
		 * {id: "#", name: "", width:40,behavior:"selectAndMove",selectable:false,resizable:false,cssClass:"cell-reorder dnd"}
		 * 이 후 data 배열에서 0번째는 ordering handle이 자리 하므로 데이터를 셋팅하지 않습니다. 
		 * 
		 */
		
		
		
		_grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
		
		var moveRowsPlugin = new Slick.RowMoveManager({
			cancelEditOnDrag : true
		});
	    //무빙 전처리
		moveRowsPlugin.onBeforeMoveRows.subscribe(function(e, data) {
			for (var i = 0; i < data.rows.length; i++) {
				// no point in moving before or after itself
				if (data.rows[i] == data.insertBefore
						|| data.rows[i] == data.insertBefore - 1) {
					e.stopPropagation();
					return false;
				}
			}
			return true;
		});
	    //무빙 후처리
		moveRowsPlugin.onMoveRows.subscribe(function(e, args) {
			var _data = _dataFunc();
			var extractedRows = [], left, right;
			var rows = args.rows;
			var insertBefore = args.insertBefore;
			left = _data.slice(0, insertBefore);
			right = _data.slice(insertBefore, _data.length);
			rows.sort(function(a, b) {
				return a - b;
			});
			for (var i = 0; i < rows.length; i++) {
				extractedRows.push(_data[rows[i]]);
			}
			rows.reverse();
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (row < insertBefore) {
					left.splice(row, 1);
				} else {
					right.splice(row - insertBefore, 1);
				}
			}
			_data = left.concat(extractedRows.concat(right));
			var selectedRows = [];
			for (var i = 0; i < rows.length; i++)
				selectedRows.push(left.length + i);
			//_grid.resetActiveCell();
			//_grid.setData(_data);
			_dataView.setItems(_data);
			_grid.setSelectedRows(selectedRows);
			_grid.invalidate();
			
			afterCallback(e, args);
		});
		_grid.registerPlugin(moveRowsPlugin);
		
		
		
	},
	createContextMenu : function(container, _grid, contextEvent, autoClose){
		_grid.onContextMenu.subscribe(function(e) {
			e.preventDefault();
			e.stopPropagation();
			contextEvent(e);
			var cell = _grid.getCellFromEvent(e);
			$(container)
						.data("row", cell.row)
						.css("top", (e.pageY-50))
						.css("left", (e.pageX-5))
						.show();
			
				$("body").on("click", function(e) {
				
					if (!$(e.target).closest(".c-context-layer").length > 0){
						$(container).hide();
					}
				});
			
			
		});
	}
}