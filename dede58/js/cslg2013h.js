$(function() {
	// ????????
	$("#email-show").click(function() {$("#xz-email").slideToggle(); return false;});
	// ????????????
	$("#nav > li").hover(function() {
		$(this).toggleClass("hover");
		$("div", this).fadeToggle();
	});
	
	// ??????????????????????????????????????????
	$(".notice-list > li > a").each(function() {
		if($(this).height() < 20) $(this).addClass("one-line");
	});
	
	// tabs????
	var $tabs = $("[show]");
	$(".active[show]").each(function() {
		$($(this).attr("show")).siblings().hide();
	});
	$tabs.hover(function() {
		$(this).addClass("active").siblings().removeClass("active");
		// $(this).siblings("a").attr("href", $(this).attr("more"));
		$($(this).attr("show")).show().siblings().hide();
	}, function() {});
	
	// ????????????????????????
	$("[cata]").each(function() {
		if(location.href.indexOf($(this).attr("cata")) >= 0)	$(this).show();
	});
	// ????????????????????
	$(".lm-list > li").hover(function() {$(this).toggleClass("hover");});
	$(".lm-list > li > a").each(function() {
		if(location.href.indexOf($(this).attr("href")) >= 0)	$(this).parent().addClass("active");
		
		// ??????????????
		//if($(this).html() == "????????") $(this).parent().append($("#lsyg-box"));
		if($(this).html() == "????????") $(this).parent().append($("#xydt-box"));
		if($(this).html() == "????????") $(this).parent().append($("#jswh-box"));
		if($(this).html() == "????????") $(this).parent().append($("#mlxy-box"));
		if($(this).html() == "????????") $(this).parent().append($("#ppwh-box"));
	});
	$(".lm-list > li > dl").prev().click(function() {
		$(this).next().slideToggle();
		return false;
	});
	
	// ????????????????????????????????
	$(".lm-list > li > dl > dd > a").each(function() {
		if(location.href.indexOf($(this).attr("href")) >= 0)	$(this).parent().parent().show();
	});
	
	// ie6????????????
	$("[min-height]").each(function() {
		var min_h = $(this).attr("min-height");
		if($(this).height() < min_h)	$(this).height(min_h);
	});
	
	
	// ????????????
	if(location.href.indexOf("/xrld/") > 0) {
		var sec = $(".pageList").addClass("xrld-list").children().get(1);
		$(sec).addClass("xrld");
	}


	//??????????
	$(".pageList").each(function() {
		var $items = $(this).children();
		var totalNum = $items.length;
		var pageSize = $(this).attr("pageSize");
		if(!pageSize) pageSize = 20;
		var currentPage = 1;
		var totalPage = Math.ceil(totalNum / pageSize); 
		if(!totalPage && totalNum) totalPage = 1;
		if(!totalPage) currentPage = 0;
		
		var $pageChanger = $(this).siblings(".pageChanger");
		var $totalPiece = $pageChanger.children(".totalPiece");
		var $curPage = $pageChanger.children(".curPage");
		var $totalPage = $pageChanger.children(".totalPage");
		var $pageHome = $pageChanger.children(".pageHome");
		var $pagePre = $pageChanger.children(".pagePre");
		var $pageNext = $pageChanger.children(".pageNext");
		var $pageEnd = $pageChanger.children(".pageEnd");
		var $pageNum = $pageChanger.children(".pageNum");
		var $pageGo = $pageChanger.children(".pageGo");
		
		//????????????
		$totalPiece.html(totalNum);
		$curPage.html(currentPage);
		$totalPage.html(totalPage);
		
		//??????????????
		function showCurrentPage() {
			if(currentPage) {
				$items.hide().slice((currentPage - 1) * pageSize, currentPage * pageSize).show();
				$curPage.html(currentPage);
			}
		}
		
		//????????????
		//??????????
		$pageHome.click(function() {
			if(currentPage)	currentPage = 1;
			showCurrentPage();
			return false;
		});
		//??????
		$pagePre.click(function() {
			if(currentPage > 1)	--currentPage;
			showCurrentPage();
			return false;
		});
		//??????
		$pageNext.click(function() {
			if(currentPage < totalPage)	++currentPage;
			showCurrentPage();
			return false;
		});
		//????
		$pageEnd.click(function() {
			currentPage = totalPage;
			showCurrentPage();
			return false;
		});
		//????????????
		$pageGo.click(function() {
			pageN = parseInt(0 + $pageNum.val(), 10);
			if(pageN < 1 || pageN > totalPage) {
				alert("????????????????????????");
				return false;
			}
			currentPage = pageN;
			showCurrentPage();
			return false;
		});
		//????????????
		$pageNum.keydown(function(e) {
			//alert(e.keyCode);//13
			if(e.keyCode == 13) {
				$pageGo.click();
			}
		});
		
		showCurrentPage();
	});//??????????????
});