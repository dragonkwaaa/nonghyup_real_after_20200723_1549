
function movePage1(pno){
	pno						=	pno			?	pno		:	1;
	$('input[name="pno1"]').val(pno);
	get_review();
}

function get_review(){
	let code 				=	$('input[name="code"]').val();
	let type 				=	$('input[name="type"]').val();
	let token 				=	$('input[name="token"]').val();
	let pno 				=	$('input[name="pno1"]').val();
	let url 				=	'/product/event/info_get_review';
	let dataType 			=	'json';
	let param 				=	{
		code				:	code,
		type 				:	type,
		pno					:	pno
	};

	postService(url, dataType, param, function(data){
		let str 			=	'';
		let reviewList 		=	data.reviewList;
		let reviewTot 		=	data.reviewTot;
		let reviewAvg 		=	data.reviewAvg;
		let reviewRound 	=	data.reviewRound;
		let recordPerPage 	=	data.recordPerPage;
		let pnoPerPage 		=	data.pnoPerPage;
		let totalCount 		=	data.totalCount;

		let pno 			=	data.pno;

		$('input[name="pno1"]').val(pno);
		$('#reviewTot').html('구매만족도');
		$('#reviewerNum').html('&nbsp('+reviewTot+')');
		$('#reviewAvg').html(reviewAvg);

		var addClass1 				=	'';
		var addClass2 				=	'';
		var addClass3 				=	'';
		var addClass4 				=	'';
		var addClass5 				=	'';

		for(var i = 1 ; i <= reviewRound ; i ++){
			$('#avgStar'+i).addClass(' on');
		}
		$('#reviewList').html('');
		if(reviewList.length){
			var i 			=	1;
			$.each(reviewList, function(index, re) {
				var bbsIdx		=	re.bbsIdx;
				var score 		=	re.reviewScore;
				str				+=	'<li class="relative">';
				str				+=	'	<a href="javascript:void(0);" class="reviewHeadline">';
				str				+=	'		<span class="indexNumBox">'+i+'</span>';
				str				+=	'		<div class="rating rigid">';
				str				+=	'			<span href="javascript:void(0);" class="rateStar '+(score >= 1 ? " on" : "")+'"></span>';
				str				+=	'			<span href="javascript:void(0);" class="rateStar '+(score >= 2 ? " on" : "")+'"></span>';
				str				+=	'			<span href="javascript:void(0);" class="rateStar '+(score >= 3 ? " on" : "")+'"></span>';
				str				+=	'			<span href="javascript:void(0);" class="rateStar '+(score >= 4 ? " on" : "")+'"></span>';
				str				+=	'			<span href="javascript:void(0);" class="rateStar '+(score >= 5 ? " on" : "")+'"></span>';
				str				+=	'		</div>';
				str				+=	'		<span class="reviewTitle">'+re.subject+'</span>';
				str				+=	'		<span class="reviewerID">'+re.userID+'</span>';
				str				+=	'		<span class="absoluteMR">'+re.regDate.substring(0,10)+'</span>';
				str				+=	'	</a>';
				str				+=	'	<div class="reviewDetailGroup">';
				str				+=	'		<div class="reviewText">딸기가 정말 달고 시원해요. 크기도 크고, 설익은것도 없어서 너무 좋아요.</div>';

				// :: 리뷰 상세 내용(토글 가능) 파트
				str				+=	'		<div class="reviewImgGroup">';
				str				+=	'			<img src="/common/img/mainSliderImg.png"/>';
				str				+=	'			<img src="/common/img/mainSliderImg.png"/>';
				str				+=	'			<img src="/common/img/mainSliderImg.png"/>';
				str				+=	'			<img src="/common/img/mainSliderImg.png"/>';
				str				+=	'			<img src="/common/img/mainSliderImg.png"/>';
				str				+=	'		</div>';
				str				+=	'	</div>';
				str				+=	'</li>';
				i++;
			});

		} else {

		}
		setPaging(recordPerPage, pnoPerPage, pno, totalCount, 1);
		$('#reviewList').html(str);
	}, '', '', '', '', 1);
}

function movePage2(pno){
	pno						=	pno			?	pno		:	1;
	$('input[name="pno2"]').val(pno);
	get_ask();
}
function get_ask(){
	$('#askList').html('');

	let code 				=	$('input[name="code"]').val();
	let type 				=	$('input[name="type"]').val();
	let token 				=	$('input[name="token"]').val();
	let pno 				=	$('input[name="pno2"]').val();
	let url 				=	'/product/event/info_get_ask';
	let dataType 			=	'json';
	let param 				=	{
		code				:	code,
		type 				:	type,
		pno					:	pno
	};

	postService(url, dataType, param, function(data){
		let str1 			=	'';
		let askList 		=	data.askList;
		let recordPerPage 	=	data.recordPerPage;
		let pnoPerPage 		=	data.pnoPerPage;
		let totalCount 		=	data.totalCount;
		let pno 			=	data.pno;

		$('input[name="pno2"]').val(pno);
		if(askList.length){

			$.each(askList, function(index, ask) {
				var reText 			=	'미완료';
				var reContents		=	'답변 준비중입니다.';
				if(ask.reContents){
					reText 			=	'답변완료';
					reConents 		=	ask.reContents;
				}
				str1 			+=		'	<li class="relative">';
				str1 			+=		'		<a href="javascript:void(0);" class="script_inquirySpecShow noticeListTitle">';
				str1 			+=		'			<span>'+reText+'</span>';
				str1 			+=		'			<span class="ml30 titleMain">'+ask.contents+'</span>';
				str1 			+=		'			<span class="ml30 f_roboto">'+ask.userID+'</span>';
				str1 			+=		'			<span class="absoluteR f_roboto">'+ask.regDate.substring(0,10)+'</span>';
				str1 			+=		'		</a>';
				str1 			+=		'		<div class="script_inquirySpecDetail inquiryDetailGroup">';
				str1 			+=		'			<div class="inquirySpec questionGroup relative">';
				str1 			+=		'				<span class="inquiryMark absoluteL">Q</span>';
				str1 			+=		'				<pre>'+ask.contents+'</pre>';
				str1 			+=		'			</div>';
				str1 			+=		'			<div class="inquirySpec answerGroup relative">';
				str1 			+=		'				<span class="inquiryMark absoluteL">A</span>';
				str1 			+=		'				<pre>'+reContents+'</pre>';
				str1 			+=		'			</div>';
				str1 			+=		'		</div>';
				str1 			+=		'	</li>';

			});

		} else {

		}
		setPaging(recordPerPage, pnoPerPage, pno, totalCount, 2);
		$('#askList').html(str1);
	}, '', '', '', '', 1);
}

function insert_ask(){
	let contents			=	$('#contents').val();

	if(!contents.trim()){
		alert('내용을 입력해주세요.');
		$('#contents').focus();
		return;
	}

	let url 				=	'/product/event/info_insert_ask';
	let dataType			=	'json';
	let param				= 	{
		code				:	$('input[name="code"]').val(),
		type 				:	$('input[name="type"]').val(),
		contents 			:	contents
	};
	postService(url, dataType, param, '', '');
}

function set_favorite(){

	let url 				=	'/product/event/info_set_favorite';
	let dataType 			=	'json';
	let param 				=	{
		code				:	$('input[name="code"]').val(),
		type 				:	$('input[name="type"]').val()
	};

	postService(url, dataType, param, '', '');
}


function set_cart(){

	if($('input[name="total"]').val() == 0){
		alert('옵션을 선택해주세요.');
		return;
	}

	let isRegular 			=	$('input[name="isRegular"]').val();
	let userRegular 		=	$('input[name="userRegular"]').val();

	if(isRegular == 1){
		if(userRegular != 1){
			if(confirm('정기회원만 사용하실 수 있습니다. 정기회원 등록페이지로 이동하시겠습니까?')){
				location.href	=	'/my/myRegular';
				return;
			} else {
				return;
			}
		}
	}

	let form				=   document.querySelector("#frm");
	let postData			=   new FormData(form);

	let url					=	'/product/event/info_set_cart';
	let dataType			=	'json';
	let param				= 	postData;
	let formType			=	1;
	postService(url, dataType, param, '', formType);
}

function directOrder(){
	if($('input[name="total"]').val() == 0){
		alert('옵션을 선택해주세요.');
		return;
	}

	let form				=   document.querySelector("#frm");
	let postData			=   new FormData(form);

	let url					=	'/order/event/orderReg_before_order';
	let dataType			=	'json';
	let param				= 	postData;
	let formType			=	1;
	postService(url, dataType, param, '', formType);
}







// :: 별점 평가 스크립트(공용)
/*$(document).on('click', '.rating.selectable a', function(){
	$(this).parent('.rating.selectable').children('a.rateStar').removeClass('on');
	$(this).addClass('on');
	$(this).prevAll('a.rateStar').addClass('on');
})*/

// :: 문의사항 슬라이드 토글 스크립트
$(document).on('click', '.script_inquirySpecShow', function(){
	$(this).siblings('.script_inquirySpecDetail').slideToggle();
});

// :: 상품 후기 슬라이드 토글 스크립트
$(document).on('click', 'a.reviewHeadline', function(){
	$(this).siblings('.reviewDetailGroup').slideToggle();
});

// :: 문의하기 팝업 오픈 스크립트
$(document).on('click', '.script_goodsInquiry', function(){
	$('.popup.inquiry').show();
    $('.container').addClass('overlay');
    
    // :: 문의하기 팝업창 현재 보고 있는 화면 위치에 표시하기.
    $('.popup.inquiry').css({
        "top": (($(window).height()-$('.popup.inquiry').outerHeight())/2+$(window).scrollTop())+"px",
        "left": (($(window).width()-$('.popup.inquiry').outerWidth())/2+$(window).scrollLeft())+"px"
    }); 
});

// :: 찜하기 버튼 클릭 시 색상 및 아이콘 변경 스크립트.
$(document).on('click', '.script_favorite', function(){
	$(this).toggleClass('activated');
});