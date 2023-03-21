const swiper = new Swiper('.swiper', {
	// Optional parameters
	slidesPerView: 3, //한 화면에 보이는 슬라이드의 개수
	spaceBetween: 20, //슬라이드간의 간격
	slidesPerGroup: 1, //한번에 슬라이드 되는 개수
grabCursor:true,
	loop: true, //무한반복
	speed:1000,//슬라이더 이동 속도 지정
	autoplay: {
		delay:1000,		
		disableOnInteraction : true,
		
	},
	effect: 'coverflow',
  coverflowEffect: {
    rotate: 30,
    slideShadows: false,
	// scale:1.2,
	
  },

	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true, //인디케이터 클릭가능 여부
		type:'fales',
		
	},

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});


$(function(){

	const $header = $('header');
	const $mnu = $('#wrap > header > nav > .gnb > li > a ');//메뉴셀렉팅 -> DOM 선택
	const arrTopVal = [];//배열은 여러 데이터를 한번에 저장, 관리
  
	//셀렉팅 집합을 순회하며 처리하는 .each() 메소드
	$('section').each(function(idx){
  
	  //어떤 요소의 top 값(body로부터 떨어진 거리)을 구하는 방법 => .offset().top
	  arrTopVal[idx] = $(this).offset().top;
  
	});
  
  
	//$mnu 에 대한 click 이벤트 구문
	$mnu.on('click', function(evt){
	  evt.preventDefault();
  
	  // let nowIdx = 이번에 클릭한 메뉴의 index 번호추출
	  let nowIdx = $mnu.index(this);
  
	  //메뉴 활성화 표시
	  //$mnu.eq(nowIdx).parent().addClass('on').siblings().removeClass('on');
  
	  $('html,body').animate({scrollTop:arrTopVal[nowIdx]});
	});
  
  
	$(window).on({
	  
	  'scroll' : function(){
		//scrollTop 값에 소수점이 발생할 경우를 대비
		const scrollTop = Math.ceil($(window).scrollTop());
  
  
		//1. 스크롤탑값에 따른 header 고정처리
		if(scrollTop>900){
		  $header.addClass('fixed');
		  $header.next().css({marginTop:66});
		}else{
		  $header.removeClass('fixed');
		  $header.next().css({marginTop:0});
		}
  
  
		//2. 스크롤탑값에 따른 메뉴 활성화 표시
		for(let i=0;i<$mnu.length;i++){
		  //for문을 이용하여 5개의 if문을 하나로 작성
		  if(scrollTop>=arrTopVal[i]-200){
			$mnu.eq(i).parent().addClass('on').siblings().removeClass('on');
		  }else if(scrollTop<arrTopVal[0]-200){
			$mnu.parent().removeClass('on');
		  }
		}
  
  
		//탑버튼 노출처리
		const $aside = $('.go-to-top');
  
		if(scrollTop>100){
		  $aside.fadeIn();
  
		}else{
		  $aside.fadeOut();
		}
		/*.fadeIn() : 실행시 숨겨진 요소를 나타나게 한다.
  
		.fadeOut() : 실행시 요소를 사라지게 한다.
  
		.fadeToggle() : 실행시 fadeIn() 메소드와 fadeOut() 메소드를 번갈아 가면서 적용한다.
  
		.fadeTo() : fade 효과에서 사용하는 opacity 속성값을 직접 설정한다.
  
   */
		//view>0 이면 푸터가 화면에 노출되었다는 것을 의미
		const view = (scrollTop + $(window).height()) - $('footer').offset().top;
  
		if(view>90){//푸터노출
		  $aside.css('margin-bottom', view);
		}else{
		  $aside.css('margin-bottom', 0);
		}
	  }
	  ,
	  
	  'load' : function(){
		$('html,body').animate({scrollTop:0},400);
	  }//load 이벤트 - 화면에 내용이 출력완료된 시점에 발생
	});
  
  
  
	//top 버튼에 대한 click 이벤트 구문
	$('.logo, .top').on('click', function(evt){
	  evt.preventDefault();
  
	  $('html,body').animate({scrollTop:0},400);
	})
  
  });  
  //모바일영역
  const $toggle = $('.toggle');
   const $this = $('.add');

  $toggle.foreach(function(index){
	
	
	$toggle.on('click', function(e){
	  e.preventDefault();
	  $(this).toggleClass('.add' + (index+1));
	})
  });
  

 
//   $('.add').on('click ', function () {
// 	$toggle.addClass('on');
//   });
//   $toggle.on('click ', function ($toggl) {
// 	$toggl.removeClass('on');
//   });
//   $('.toggle').on('click ', function () {
// 	$toggle.toggleClass('on');//.toggle()은 선택한 요소가 보이면 보이지 않게, 보이지 않으면 보이게 합니다.
//   });