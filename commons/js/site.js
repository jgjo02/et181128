/*nitroeye 1.04*/
/* GNB */
;(function() {
	var AccessibleNav = function() {
		this.status = false;
		this.anchor = [];
	};

	AccessibleNav.prototype = {
		initialize:function() {
			var that = this;
			that.hook = jQuery(that.options.hook);
			that.listParent = that.options.listParent;
			that._map();

			that.anchor.on('focus', function() {
					that._focus.apply(that, [this, 'focus']);
				}).on('focusout', function() {
					that.status = false;
					setTimeout(function() {
						if(that.status === false) {
							that._blur();
						}
					}, 12);
				}).on('focusin', function() {
					that.status = true;
				}).on('mouseenter', function() {
					that._focus.apply(that, [this, 'mouseover']);
				});

			that.hook.on('mouseleave', function() {
				jQuery(this).find(that.listParent).removeClass(that.options.mouseoverClass);
				that.hook.removeClass(that.options.selectClass);
			});
		},
		_map:function() {
			var that = this;

			that.hook.find('a').each(function() {
				that.anchor = jQuery.merge(jQuery(this), that.anchor);
			});
		},
		_focus:function(el, type) {
			var that = this,
				_class = type === 'focus' ? that.options.focusClass : that.options.mouseoverClass;

			jQuery(el).closest(that.hook).addClass(that.options.selectClass);

			jQuery(el).closest(that.listParent).addClass(_class)
				.siblings().removeClass(_class);
		},
		_blur:function() {
			var that = this;

			that.hook.removeClass(that.options.selectClass)
				.find(that.listParent).removeClass(that.options.focusClass);
		}
	};

	var gnb = new AccessibleNav();

	return {
		load:function() {
			var that = this;
			jQuery(window).on('load', function() {
				gnb.options = {
					hook:'#gnb-go .gnb-ul',
					listParent:'li.gnb-menu',
					selectClass:'selected',
					focusClass:'focus',
					mouseoverClass:'over'
				};

				gnb.initialize();
			});
		}
	};
})().load();

/* 3차 추가 */
function gnbThird() {


		var oldIndex = 0;

		jQuery('.sub-nav__box__list').mouseenter(function() {
			var thisIndex = jQuery('.sub-nav__box__list').index(this);

			jQuery('.sub-nav__3rd').eq(thisIndex).addClass('on');
			jQuery('.sub-nav__box__list').eq(thisIndex).addClass('on');
			if(oldIndex != null && thisIndex != oldIndex){
				jQuery('.sub-nav__3rd').eq(oldIndex).removeClass('on');
				jQuery('.sub-nav__box__list').eq(oldIndex).removeClass('on');

				}
			oldIndex = thisIndex;

			return false;
		});

		jQuery('.sub-nav__box__list').mouseleave(function() {
			var thisIndex = jQuery('.sub-nav__box__list').index(this);

				jQuery('.sub-nav__3rd').eq(oldIndex).removeClass('on');
				jQuery('.sub-nav__box__list').eq(oldIndex).removeClass('on');

			oldIndex = thisIndex;

			return false;
		});
		jQuery('.sub-nav__box__list > a').focusin(function() {
			var thisIndex = jQuery('.sub-nav__box__list > a').index(this);

			jQuery('.sub-nav__3rd').eq(thisIndex).addClass('on');
			jQuery('.sub-nav__box__list').eq(thisIndex).addClass('on');
			if(oldIndex != null && thisIndex != oldIndex){
				jQuery('.sub-nav__3rd').eq(oldIndex).removeClass('on');
				jQuery('.sub-nav__box__list').eq(oldIndex).removeClass('on');

				}
			oldIndex = thisIndex;

			return false;
		});

}

/* 메인탭1 */
function mainBbs() {
		var oldIndex = 0;



		jQuery('li.js_bs_menu').click(function() {//alert(jQuery('div').index(this));
			//var thisIndex = jQuery('li.js_bs_menu').index(this);

			var thisIndex = jQuery('li.js_bs_menu').index(this);

			jQuery('div.js_bs_t_box').removeClass('selected');
			jQuery('li.js_bs_menu').removeClass('selected');

			jQuery('div.js_bs_t_box').eq(thisIndex).addClass('selected');
			jQuery('li.js_bs_menu').eq(thisIndex).addClass('selected');

			return false;
		});

};


function mainBbs2() {
		var oldIndex = 0;

		jQuery('li.js_bs_menu2').click(function() {
			var thisIndex = jQuery('li.js_bs_menu2').index(this);

			jQuery('div.js_bs_t_box2').eq(thisIndex).addClass('selected');
			jQuery('li.js_bs_menu2').eq(thisIndex).addClass('selected');
			if(oldIndex != null && thisIndex != oldIndex){
				jQuery('div.js_bs_t_box2').eq(oldIndex).removeClass('selected');
				jQuery('li.js_bs_menu2').eq(oldIndex).removeClass('selected');

				}
			oldIndex = thisIndex;

			return false;
		});

};


/* 퀵메뉴 */
function initMoving(target, position, topLimit, btmLimit) {
		if (!target)
			return false;

		var obj = target;
		obj.initTop = position;
		obj.topLimit = topLimit;
		obj.bottomLimit = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - btmLimit - obj.offsetHeight;

		obj.style.position = "absolute";
		obj.top = obj.initTop;
		// obj.left = obj.initLeft;

		if (typeof(window.pageYOffset) == "number") {	//WebKit
			obj.getTop = function() {
				return window.pageYOffset;
			}
		} else if (typeof(document.documentElement.scrollTop) == "number") {
			obj.getTop = function() {
				return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			}
		} else {
			obj.getTop = function() {
				return 0;
			}
		}

		if (self.innerHeight) {	//WebKit
			obj.getHeight = function() {
				return self.innerHeight;
			}
		} else if(document.documentElement.clientHeight) {
			obj.getHeight = function() {
				return document.documentElement.clientHeight;
			}
		} else {
			obj.getHeight = function() {
				return 500;
			}
		}

		obj.move = setInterval(function() {
			if (obj.initTop > 0) {
				pos = obj.getTop() + obj.initTop;
			} else {
				pos = obj.getTop() + obj.getHeight() + obj.initTop;
				//pos = obj.getTop() + obj.getHeight() / 2 - 15;
			}

			if (pos > obj.bottomLimit)
				pos = obj.bottomLimit;
			if (pos < obj.topLimit)
				pos = obj.topLimit;

			interval = obj.top - pos;
			obj.top = obj.top - interval / 3;
			obj.style.top = obj.top + "px";
		}, 30)
}


/* faq 형 메뉴   */

function faq_tog() {
		var oldIndex = 0;
		jQuery(".tab_tong .faq_q a").toggle(
		  function () {
			var thisIndex = jQuery('.tab_tong .faq_q a').index(this);
			jQuery(".tab_tong .faq_q a").eq(thisIndex).addClass('selected');
			jQuery(".answer_box").eq(thisIndex).addClass('selected');
			//jQuery('.tab_tong h3 span').eq(thisIndex).find('img').attr({ src: jQuery('.tab_tong h3 span').find('img').attr('src').replace('_off', '_on') });
		  },
		  function () {
			var thisIndex = jQuery('.tab_tong .faq_q a').index(this);
			jQuery(".tab_tong .faq_q a").eq(thisIndex).removeClass('selected');
			jQuery(".answer_box").eq(thisIndex).removeClass('selected');
			//jQuery('.tab_tong h3 span').eq(thisIndex).find('img').attr({ src: jQuery('.tab_tong h3 span').find('img').attr('src').replace('_on', '_off') });
		  }
		);
}


/**/

/*배너형 스크롤*/
function mainRolling() {
		$.fn.roll = function(){
			var hook = $(this);
			var UL = hook.find('.listwrap');
			var LI = UL.find('li');
			var ULwidth = LI.outerWidth() * LI.length;
			var prev = jQuery('.r_prev');
			var next = jQuery('.r_next');
			var pause = jQuery('.r_pause');
			var start = jQuery('.r_start');
			var interval;
			var intervalPosition = 'next';

			var nextEvent = function(){
				clearInterval(interval);
				intervalPosition = 'next';
				interval = setInterval(intervalFN, 5000);

				LI = UL.find('li');
				UL.animate({left:-LI.outerWidth()},	function(){
					UL.css({left:0});
					var firstLI = LI.eq(0).remove();
					firstLI.appendTo(UL);
				});
				return false;
			};

			var prevEvent = function(){
				clearInterval(interval);
				intervalPosition = 'prev';
				interval = setInterval(intervalFN, 5000);

				LI = UL.find('li');
				var lastLI = LI.eq(LI.length-1).remove();
				lastLI.prependTo(UL);
				UL.css({left:-LI.outerWidth()});
				UL.animate({left:0});
				return false;
			};

			var pauseEvent = function() {
				clearInterval(interval);
				return false;
			};

			var startEvent = function() {
				clearInterval(interval);
				interval = setInterval(intervalFN, 5000);
				return false;
			};

			var intervalFN = function() {
				if(intervalPosition == 'next')
					nextEvent();
				else
					prevEvent();
			};

			interval = setInterval(intervalFN, 5000);

			UL.css({width:ULwidth});
			next.bind('click', nextEvent);
			prev.bind('click', prevEvent);
			start.bind('click', startEvent);
			pause.bind('click', pauseEvent);
			pauseEvent(); //stop;

		/*
			if(jQuery('.listwrap li').length <= 3) {
				jQuery('.r_next').addClass('hide');
				jQuery('.r_prev').addClass('hide');
			}else if (jQuery('.listwrap li').length >= 4) {
				jQuery('.r_next').removeClass('hide');
				jQuery('.r_prev').removeClass('hide');
			}
		*/
		}
		jQuery('#test').roll();
}


/* 메인롤링1 */
function mainRolling1() {
		jQuery.fn.roll = function(){
			var hook = jQuery(this);
			var UL = hook.find('.js_roll_item');
			var LI = UL.find('li');
			var ULwidth = LI.outerWidth() * LI.length;
			var prev = jQuery('#js_prev1');
			var next = jQuery('#js_next1');
			var pause = jQuery('#js_pause1');
			var start = jQuery('#js_start1');
			var interval;
			var intervalPosition = 'next';

			var nextEvent = function(){
				clearInterval(interval);
				intervalPosition = 'next';
			//	interval = setInterval(intervalFN, 5000);

				LI = UL.find('li');
				UL.animate({left:-LI.outerWidth()},    function(){
					UL.css({left:0});
					var firstLI = LI.eq(0).remove();
					firstLI.appendTo(UL);
				});
				return false;
			};

			var prevEvent = function(){
				clearInterval(interval);
				intervalPosition = 'prev';
			//	interval = setInterval(intervalFN, 5000);

				LI = UL.find('li');
				var lastLI = LI.eq(LI.length-1).remove();
				lastLI.prependTo(UL);
				UL.css({left:-LI.outerWidth()});
				UL.animate({left:0});
				return false;
			};

			var pauseEvent = function() {
				clearInterval(interval);
				return false;
			};

			var startEvent = function() {
				clearInterval(interval);
			//	interval = setInterval(intervalFN, 5000);
				return false;
			};

			var intervalFN = function() {
				if(intervalPosition == 'next')
					nextEvent();
				else
					prevEvent();
			};

			interval = setInterval(intervalFN, 5000);

			UL.css({width:ULwidth});
			next.bind('click', nextEvent);
			prev.bind('click', prevEvent);
			start.bind('click', startEvent);
			pause.bind('click', pauseEvent);
			pauseEvent(); //stop
		}
		jQuery('#js_roll_1').roll();
}

/* skip navigation */

function gnb_nav() {

	jQuery('.skiptoContent').focusin(function(){
		jQuery('.skiptoContent').animate({
			top:0,
			height:30,
			opacity:1
		},0);

	});
	jQuery('.skiptoContent').focusout(function(){
		jQuery('.skiptoContent').animate({
			top:-40,
			height:0,
			opacity:0
		},150);

	});
}



/* 모바일 메뉴 오픈 */
function mobile_menu() {
	jQuery('.mobile_on_off').on('click',function(){
		jQuery('body').toggleClass('mobile_menu_open');
		jQuery('#gnb_nav_mobile').toggleClass('selected');
		jQuery('.mobile_top_nav').toggleClass('selected');
		jQuery('.mobile_top_nav .gnb').toggleClass('selected');
		jQuery('.top-nav').toggleClass('selected');
		return false;
	});
/*
	jQuery('.m_open_btn').toggle(
		function(){
		//jQuery('.m_open_btn').find('img').attr({ src: jQuery('.m_cont_btn a').find('img').attr('src').replace('_off', '_on') });
		jQuery('#gnb_nav_mobile').css("display","block").animate({
			opacity:1
		},250);

		jQuery('.gnb').css("display","block").animate({
			opacity:1
		},250);
		jQuery('.top-nav').css("display","block").animate({
			opacity:1
		},250);
			},
			function(){
			//jQuery('.m_open_btn').find('img').attr({ src: jQuery('.m_cont_btn a').find('img').attr('src').replace('_on', '_off') });
			jQuery('#gnb_nav_mobile').css("display","none").animate({
				opacity:0
			},250);

			jQuery('.gnb').css("display","none").animate({
				opacity:1
			},250);
			jQuery('.top-nav').css("display","none").animate({
				opacity:1
			},250);
			}
	);*/
	jQuery('.m_s_btn').toggle(
		function(){
		//jQuery('.m_open_btn').find('img').attr({ src: jQuery('.m_cont_btn a').find('img').attr('src').replace('_off', '_on') });
		jQuery('.main_search_box').css("display","block").animate({
			opacity:1
		},250);
			jQuery('#main_search2').focus();
		},
		function(){
		//jQuery('.m_open_btn').find('img').attr({ src: jQuery('.m_cont_btn a').find('img').attr('src').replace('_on', '_off') });
		jQuery('.main_search_box').css("display","none").animate({
			opacity:0
		},250);
		}
	);
	return false;
}

/* 게시판 이미지 순차부여 */
function gg_view_img(){
	jQuery('.bbs_cont img').each(function(i) {
		jQuery(this).attr('alt', jQuery(this).attr('alt') + ' ' + (i + 1));
	});
}



/*--------------------*/
var $window = jQuery(window),
	$document = jQuery(document),
	$html = jQuery('html'),
	fontIndex = jQuery.cookie('webFontSize') ? jQuery.cookie('webFontSize') : 1;

/* font size */
function setFontSizeClass() {
	$html.removeClass(function(index,class_list_str){
		var class_list = class_list_str.split(' ');
		for(var i = 0 ; i < class_list.length ; i ++) {
			var cls = class_list[i];
			if(cls.match(/websize\-[0-9]+/)) {
				return cls;
			}
		}
	}).addClass('websize-' + fontIndex);
	jQuery.cookie('webFontSize', fontIndex, { path: '/' });
}
function js_font_plus(){
	if(fontIndex >= 5) return false;
	fontIndex++;
	setFontSizeClass();
}
function js_font_minus(){
	if(fontIndex <= 1) return false;
	fontIndex--;
	setFontSizeClass();
}

jQuery(function() {
	$html.addClass('websize-' + fontIndex);
});

/**/
function menuSize() {
	var menuWd = 100/jQuery('.tab_auto > li').length;
		jQuery('.tab_auto > li').css('width',menuWd + '%');
};




function sub_light(){

	if(jQuery('div').is('.depth_third') == true){
		jQuery('.depth_third').addClass('on');

	}else if (jQuery('div').is('.depth_third') == false && jQuery('div').is('.depth_second') == true){
		jQuery('.depth_second').addClass('on');

	}else{
		alert('dd');
		jQuery('.depth_first').addClass('on');
	}

}


/* 사이드메뉴 */
function side_open(){
		jQuery('.side-list__li__inbox').closest('.side-list__li').addClass('open-type');
		jQuery('.spp__in__small').closest('.spp__in').addClass('sp-open-type');

		var oldIndex = 0;
		jQuery('.open-type span').bind('click',function() {//alert(jQuery('div').index(this));
			var thisIndex = jQuery('.open-type span').index(this);

			jQuery('.open-type').eq(thisIndex).toggleClass('on');
			oldIndex = thisIndex;

			return false;
		});

		jQuery('.spp__in > a').bind('click',function() {
			var smallBox = jQuery(this).closest('.spp__in').children('.spp__in__small').length;
				if ( smallBox == 1 )
				{
					jQuery(this).closest('.spp__in').toggleClass('on')
				return false;
				}
			}

		) ;
}

function side_open2(){
		jQuery('.side-list__li__inbox').closest('.side-list__li').addClass('open-type');
		jQuery('.spp__in__small').closest('.spp__in').addClass('sp-open-type');

}

function menuLight() {

	var menuNum = jQuery("#menuNo").val();
	var subNum = jQuery("#subMenuNo").val();
	var thirdMenuNo = jQuery("#thirdMenuNo").val();
	var menuWd = 100/jQuery('#submenu > ul > li').length;

	jQuery('#sidebar > div > ul > li.2dep_'+subNum).addClass('on');
	jQuery('#sidebar > div > ul > li > div > ul >  li.3dep_'+thirdMenuNo).addClass('on');

}


/**/
function gnb_type(){
	var gnbli = jQuery('.gnb-ul > li').length;
	if ( gnbli == 5) {
		jQuery('.gnb').addClass('five_type');
	} else if ( gnbli == 2){
		jQuery('.gnb').addClass('two_type');
	} else if ( gnbli == 3){
		jQuery('.gnb').addClass('three_type');
	} else if ( gnbli == 4){
		jQuery('.gnb').addClass('four_type');
	} else if ( gnbli == 7){
		jQuery('.gnb').addClass('seven_type');
	} else if ( gnbli == 8){
		jQuery('.gnb').addClass('eight_type');
	} else if ( gnbli == 9){
		jQuery('.gnb').addClass('nine_type');
	} else if ( gnbli == 10){
		jQuery('.gnb').addClass('ten_type');
	} else if ( gnbli == 11){
		jQuery('.gnb').addClass('eleven_type');
	} else {
		jQuery('.gnb').addClass('six_type');
	}
}

/**/
function tabLength(){
	var tabli = jQuery('.type_add > ul > li').length;
	if ( tabli == 5) {
		jQuery('.type_add').addClass('five-type');
	} else if ( tabli == 2){
		jQuery('.type_add').addClass('two-type');
	} else if ( tabli == 3){
		jQuery('.type_add').addClass('three-type');
	} else if ( tabli == 4){
		jQuery('.type_add').addClass('four-type');
	} else if ( tabli == 7){
		jQuery('.type_add').addClass('seven-type');
	} else if ( tabli == 8){
		jQuery('.type_add').addClass('eight-type');
	} else if ( tabli == 9){
		jQuery('.type_add').addClass('nine-type');
	} else if ( tabli == 10){
		jQuery('.type_add').addClass('ten-type');
	} else if ( tabli == 11){
		jQuery('.type_add').addClass('eleven-type');
	} else {
		jQuery('.type_add').addClass('six-type');
	}
}

/*sidemenu mobile*/
function mobile_ver_menu() {
    jQuery('#sidebar h2 a').toggle(function() {
    	jQuery('#sidebar').addClass('selected');
    	jQuery('#sidebar h2 a').html('CLOSE');
        jQuery('.sidebar__wrap').animate({
            opacity : 1,
        	marginLeft : 0
        }, 350);
    }, function() {
    	jQuery('#sidebar').removeClass('selected');
    	jQuery('#sidebar h2 a').html('MENU');
    	jQuery('.sidebar__wrap').animate({
            opacity : 0,
        	marginLeft : -280
        }, 350);
    });
}

/*news_letter*/
function selectTab() {

	var oldIndex = 0;

	jQuery('.select_chg').click(function() {//alert(jQuery('div').index(this));
		var thisIndex = jQuery('.select_list option').index(jQuery('.select_list option:selected'));
		jQuery('.select_tab').removeClass('selected');

		jQuery('.select_tab').eq(thisIndex).addClass('selected');
		jQuery('.select_tab.selected .js_tab_box').eq(0).addClass('selected');
		jQuery('.select_tab.selected .js_tab_list li').eq(0).addClass('selected');

		return false;
	});
};
selectTab();




// ==========================================================================

/* tab  */
function moveTap(su) {

	document.title =  jQuery( '.js_tab_list .selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';

	var oldIndex = 0;
	var thisIndex = su;

	jQuery('div.js_tab_box').removeClass('selected');
	jQuery('.js_tab_list li').removeClass('selected');

	jQuery('div.js_tab_box').eq(thisIndex).addClass('selected');
	jQuery('.js_tab_list li').eq(thisIndex).addClass('selected');
	document.title =  jQuery( '.js_tab_list .selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';

	return false;
};
/* tab  */
function subTab() {

	document.title =  jQuery( '.js_tab_list .selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';


	var oldIndex = 0;



	jQuery('.js_tab_list li').click(function() {//alert(jQuery('div').index(this));
		var thisIndex = jQuery('.js_tab_list li').index(this);

		jQuery('div.js_tab_box').removeClass('selected');
		jQuery('.js_tab_list li').removeClass('selected');

		jQuery('div.js_tab_box').eq(thisIndex).addClass('selected');
		jQuery('.js_tab_list li').eq(thisIndex).addClass('selected');
		document.title =  jQuery( '.js_tab_list .selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';

		return false;
	});
};
/* tab  */
function subTab2() {

	document.title =  jQuery( '.js_tab_list2 .selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';


	var oldIndex = 0;



	jQuery('.js_tab_list2 li').click(function() {//alert(jQuery('div').index(this));
		var thisIndex = jQuery('.js_tab_list2 li').index(this);

		jQuery('div.js_tab_box2').removeClass('selected');
		jQuery('.js_tab_list2 li').removeClass('selected');

		jQuery('div.js_tab_box2').eq(thisIndex).addClass('selected');
		jQuery('.js_tab_list2 li').eq(thisIndex).addClass('selected');
		document.title =  jQuery( '.js_tab_list .selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';

		return false;
	});
};

/* 사전공표목록 tab 형식 */
function sajun_Tab() {

	document.title =  jQuery( '.sajun_tab .selected a em' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';


	var oldIndex = 0;



	jQuery('.sajun_tab li').click(function() {//alert(jQuery('div').index(this));
		var thisIndex = jQuery('.sajun_tab li').index(this);

		jQuery('div.js_tab_box').removeClass('selected');
		jQuery('.sajun_tab li').removeClass('selected');

		jQuery('div.js_tab_box').eq(thisIndex).addClass('selected');
		jQuery('.sajun_tab li').eq(thisIndex).addClass('selected');
		document.title =  jQuery( '.sajun_tab .selected a em' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';

		return false;
	});
};
/* tab N ()*/
function subTabN() {
		document.title =  jQuery( '.cont_in .js_tab_list li.selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';
	var oldIndex = 0;



	jQuery('.js_tab_list li').click(function() {//alert(jQuery('div').index(this));
		var thisIndex = jQuery('.js_tab_list li').index(this);
		jQuery('div.js_tab_box').removeClass('selected');
		jQuery('.js_tab_list li').removeClass('selected');

		jQuery('div.js_tab_box').eq(thisIndex).addClass('selected');
		jQuery('.js_tab_list li').eq(thisIndex).addClass('selected');
		document.title =  jQuery( '.cont_in .js_tab_list li.selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';

		return false;
	});
};

/*  title */
function TabTitle() {
		document.title =  jQuery( '.cont_in .tab_type2 li.selected a' ).html() + ' /' + jQuery('.loc_tit').html() + ' ▦ ';
};

/* title_copy */
function title_copy(schoolname){

	/*
	 jQuery("title").html(function() {
        var htmlString = jQuery( '.loc_tit' ).html() + ' ▦ ';
       // jQuery( this ).text( htmlString + ' ▦ ');
       return htmlString;
    });


    //jQuery( ".location a" ).attr({ href: jQuery('.location a').attr('href').replace('.php', '.jsp') });
	if (jQuery('div').hasClass('bbs_view_wrap') == true){
		document.title =  jQuery( '.loc_tit' ).html() + '게시판 상세' + ' ▦ ' + schoolname ;

	}
	else if (jQuery('div').hasClass('bbs_list_wrap') == true) {
		document.title =  jQuery( '.loc_tit' ).html() + '게시판 목록' + ' ▦ ' + schoolname ;

	}
	else if (jQuery('div').hasClass('new_gall_wrap') == true) {
		document.title =  jQuery( '.loc_tit' ).html() + ' 목록' + ' ▦ ' + schoolname ;

	}
	else {
		document.title =  jQuery( '.loc_tit' ).html() + ' ▦ ' + schoolname ;

	}
*/

	var sjLine = $('tr').hasClass('sj_line');

	if (sjLine == true ){
		document.title =  jQuery('.sj_line td').html() + ' / ' + jQuery( '.loc_tit' ).html() + ' ▦ ' + schoolname ;
	}else{
		document.title =  jQuery( '.loc_tit' ).html() + ' ▦ ' + schoolname ;
	}
};

/* 상하식 롤링 */
function RollingUpDown() {
	$.fn.roll = function(){
		var hook = $(this);
		var UL = hook.find('.listwrap2');
		var LI = UL.find('li');
		var ULwidth = LI.outerHeight() * LI.length;
		var prev = $('.r_prev2');
		var next = $('.r_next2');
		var pause = $('.r_pause');
		var start = $('.r_start');
		var interval;
		var intervalPosition = 'next';

		var nextEvent = function(){
			clearInterval(interval);
			intervalPosition = 'next';
			interval = setInterval(intervalFN, 5000);

			LI = UL.find('li');
			UL.animate({top:-LI.outerHeight()},	function(){
				UL.css({top:0});
				var firstLI = LI.eq(0).remove();
				firstLI.appendTo(UL);
			});
			return false;
		};

		var prevEvent = function(){
			clearInterval(interval);
			intervalPosition = 'prev';
			interval = setInterval(intervalFN, 5000);

			LI = UL.find('li');
			var lastLI = LI.eq(LI.length-1).remove();
			lastLI.prependTo(UL);
			UL.css({top:-LI.outerHeight()});
			UL.animate({top:0});
			return false;
		};

		var pauseEvent = function() {
			clearInterval(interval);
			return false;
		};

		var startEvent = function() {
			clearInterval(interval);
			interval = setInterval(intervalFN, 5000);
			return false;
		};

		var intervalFN = function() {
			if(intervalPosition == 'next')
				nextEvent();
			else
				prevEvent();
		};

		interval = setInterval(intervalFN, 5000);

		UL.css({width:ULwidth});
		next.bind('click', nextEvent);
		prev.bind('click', prevEvent);
		start.bind('click', startEvent);
		pause.bind('click', pauseEvent);
	}
	jQuery('#rollup').roll();
	}


/* menu 좌우 사이즈 */
function sizeComp(){
		var size_top = jQuery('#gnb-go').width();
		var size_item = jQuery('.gnb-ul ').width();
		var gnbli = jQuery('.gnb-ul > li').length;
		var size_resize = ((size_top - size_item) / gnbli );
		var size_result = size_resize / 2

		jQuery('#gnb-go .gnb-menu > a').css({paddingLeft:size_result});
		jQuery('#gnb-go .gnb-menu > a').css({paddingRight:size_result - 1});

}