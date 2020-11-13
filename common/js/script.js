/* デバイス判定
******************************************** */
var $userAgent = window.navigator.userAgent.toLowerCase();
var $scrollWidth = window.innerWidth - $(window).width();// スクロールバーの幅を取得
if ($userAgent.toLowerCase().indexOf('win') != -1) {
  $('html').addClass('windows');
} else if ($userAgent.toLowerCase().indexOf('mac') != -1) {
  $('html').addClass('mac');
}

function isTouchDevice() {
  var ua = navigator.userAgent;
  var touchDevice = false;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    touchDevice = true;
    $('html').addClass('is-touch');
  }
  return touchDevice;
}
isTouchDevice();


/* タッチデバイスのタップ操作
******************************************** */
$isTouch = ('ontouchstart' in window);
if ($isTouch) {
  var $linkTouchStart = function() {
    $thisAnchor = $(this);
    $touchPos = $thisAnchor.offset().top;
    $moveCheck = function() {
      $nowPos = $thisAnchor.offset().top;
      if ($touchPos == $nowPos) $thisAnchor.addClass('touch');
    }
    setTimeout($moveCheck, 100);
  }
  var $linkTouchEnd = function() {
    $thisAnchor = $(this);
    $hoverRemove = function() { $thisAnchor.removeClass('touch'); }
    setTimeout($hoverRemove, 500);
  }
  $(document).on('touchstart', 'a', $linkTouchStart);
  $(document).on('touchend', 'a', $linkTouchEnd);
}


/* ボックス全体をリンク対象にする
******************************************** */
$('.box-link').each(function () {
	var $anker = $(this).find('a');
	if ($anker.length) {
		$(this).css('cursor', 'pointer');
		var target = $anker.attr('target');
		var href = $anker.attr('href');
		$(this).on('click', function() {
      if (target == '_blank') {
        window.open(href, '_blank');
      } else {
        window.location = href;
      }
		});
    $(this).hover(
      function () { $(this).addClass('hover'); },
      function () { $(this).removeClass('hover'); }
    );
  }
});


/* スクロールバーの幅を返す
******************************************** */
function checkScrollbarWidth() {
	return window.innerWidth - document.body.clientWidth;
}

/* セレクトボックス
******************************************** */
$('.c-selectbox').each(function () {
  $(this).prepend('<div class="inner"><span class="value"></span></div>');
  var $select = $(this).find('select');
  var $obj = $(this).find('.inner');
  var $setSelectbox = function() {
    var $value = $select.find('option:selected').html();
    var $index = $select.prop('selectedIndex');
    $obj.find('.value').html($value);
    if ($index == 0) {
      $obj.addClass('unselected');
    } else {
      $obj.removeClass('unselected');
    }
  }
  $($select).each($setSelectbox).on('change', $setSelectbox);
});


/* アンカーリンク
******************************************** */
$('a[href^="#"].anker').on('click', function() {
  var href= $(this).attr('href');
  if (href == '#') return false;
  var target = $(href == '#' || href == '' ? 'html' : href);
  var offset = ($('.offset').length) ? $('.offset').outerHeight() : 0;
  var position = target.offset().top - offset;
  $('html, body').animate({scrollTop: position}, 750);
  return false;

});

//entry
$('a[href^="#"].anker-entry').on('click', function() {
  var href= $(this).attr('href');
  var value = $(this).data('entry');
  $('#Userseminar').val(value).trigger('change');
  if (href == '#') return false;
  var target = $(href == '#' || href == '' ? 'html' : href);
  var offset = ($('.offset').length) ? $('.offset').outerHeight() : 0;
  var position = target.offset().top - offset;
  $('html, body').animate({scrollTop: position}, 750);
  return false;
});


/* ロード完了後の処理
******************************************** */
var loadCount = 0;
var loadCountMax = 1;
$(window).on('load', function() {
  $(window).trigger('loaded');
});

$(window).on('loaded', function() {
  setTimeout(function() {
    $('html').addClass('is-loaded');
    loadCount++;
    if (loadCount === loadCountMax) {
      $(window).trigger('complete');
    }
  },100);
});


/* リサイズ時の処理
******************************************** */
var ww = $(window).width();
$(window).on('resize', function() {
  if (ww != $(window).width()) {
    ww = $(window).width();
    $('html').addClass('no-effect');
    setTimeout(function() {
      $('html').removeClass('no-effect');
    });
  }
  setTimeout(function() {
    $.fn.matchHeight._update();
  },200);
});


/* スクロール位置を取得
******************************************** */
// var scrollTop = $(window).scrollTop();
// $(window).on('load scroll', function() {
//   scrollTop = $(window).scrollTop();
//   if (scrollTop > $('#main').position().top + $('#main').outerHeight()) {
//     $('html').addClass('is-scroll');
//   } else {
//     $('html').removeClass('is-scroll');
//   }
// });


/* Form送信後のローディング
******************************************** */
var $form = $('#UserItemForm')
function loading() {
  $form.submit(function(e) {
    // 動画セミナー対応
    if (typeof checkMovieSeminar == "function") {
      if (!checkMovieSeminar()) {
        return false;
      }
    }
    if (typeof CheckStatus == "function") {
      if (!CheckStatus()) {
        return false;
      }
    }
    $('body').append('  <div id="loading"><div class="inner"><div class="dot-spin"></div><p class="loding-text">ただいま処理中です...<br>完了ページが表示されるまでお待ちください。</p></div></div>');
  });
}
function loading_safari() {
  $form.submit(function(e) {

    // 動画セミナー対応
    if (typeof checkMovieSeminar == "function") {
      if (!checkMovieSeminar()) {
        return false;
      }
    }
    $('body').append('  <div id="loading"><div class="inner"><p class="loding-text">ただいま処理中です...<br>完了ページが表示されるまでお待ちください。</p></div></div>');
  });
}

var userAgent = window.navigator.userAgent.toLowerCase();

if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 && userAgent.indexOf('edge') === -1){
  loading_safari()
} else {
  loading()
}

/* ビデオの自動再生
******************************************** */
var $video = $('#js-video');

if($video.length) {
  var videoTop = $video.offset().top;
  var videoHeight = $video.innerHeight();
  var windowInnerHeight = window.innerHeight;
  $(window).on('scroll resize', function() {
    var windowScrollTop = $(window).scrollTop();
    // videoが停止している、かつvideoが画面内に入ってきた場合、再生処理
    if ($video[0].paused && (windowScrollTop + windowInnerHeight > videoTop)) {
        $video[0].play();
    }
    // videoが再生中、かつ画面外に出た場合、停止処理
    if (!$video[0].paused && ((windowScrollTop + windowInnerHeight < videoTop) || (windowScrollTop > videoTop + videoHeight))) {
        $video[0].pause();
    }
  });
}


/* 優先申し込み　セレクトボックス
******************************************** */

if($('#js-reservation').length) {
  var $select_box = $('#Userseminar');
  var $reservation_btn = $('#js-reservation-btn');
  var $submit_btn = $('#submit');

  var url = location.href;
  var default_pardot = $('#UserItemForm').attr('action');
  if (url.indexOf('kanto') != -1) {
    $select_box.append("<option value='優先案内 [東京]'>【優先案内希望】</option>");
    $reservation_btn.attr('data-entry', '優先案内 [東京]');
  } else if (url.indexOf('osaka') != -1) {
    $select_box.append("<option value='優先案内 [大阪]'>【優先案内希望】</option>");
    $reservation_btn.attr('data-entry', '優先案内 [大阪]');
  }else if (url.indexOf('nagoya') != -1) {
    $select_box.append("<option value='優先案内 [名古屋]'>【優先案内希望】</option>");
    $reservation_btn.attr('data-entry', '優先案内 [名古屋]');
  }else if (url.indexOf('fukuoka') != -1) {
    $select_box.append("<option value='優先案内 [福岡]'>【優先案内希望】</option>");
    $reservation_btn.attr('data-entry', '優先案内 [福岡]');
  }
  $('#Userseminar').change(function() {
    if($(this).val() == "優先案内 [東京]") {
      $('#UserItemForm').attr('action', 'https://go.tapp-co.jp/l/649443/2020-03-05/crjzk');
      $submit_btn.text('優先案内を希望する');
    } else if($(this).val() == "優先案内 [大阪]") {
      $('#UserItemForm').attr('action', 'https://go.tapp-co.jp/l/649443/2020-03-05/crjzw');
      $submit_btn.text('優先案内を希望する');
    } else if($(this).val() == "優先案内 [名古屋]") {
      $('#UserItemForm').attr('action', 'https://go.tapp-co.jp/l/649443/2020-03-05/crk11');
      $submit_btn.text('優先案内を希望する');
    } else if($(this).val() == "優先案内 [福岡]") {
      $('#UserItemForm').attr('action', 'https://go.tapp-co.jp/l/649443/2020-03-05/crk13');
      $submit_btn.text('優先案内を希望する');
    } else {
      $('#UserItemForm').attr('action', default_pardot);
      $submit_btn.text('無料で参加する');
    }
  });
}

$('#Userseminar').change(function() {
    if($(this).val() == "動画セミナー") {
      $('#submit').text('無料で視聴する');
    } else {
      $('#submit').text('無料で参加する');
    }
});

$('#Userfree').change(function() {
  console.log('hoge');
  var status = $('#Userfree option:selected').text();
  var listing_status = $('#listing-status');
  if(status == "正社員(上場)") {
    listing_status.val('上場');
  } else if (status == "正社員(非上場)") {
    listing_status.val('非上場');
  } else {
    listing_status.val('');
  }
});


