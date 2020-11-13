'use strict';

checkStatus();
var userAgent = window.navigator.userAgent.toLowerCase();
function checkStatus() {
    $('form').submit(function (e) {
        var status = $('#Userfree').val() ? $('#Userfree').val() : '';
        var salary = $('#Userfree2').val() ? $('#Userfree2').val() : '';
        var age = $('#Userage').val() ? $('#Userage').val() : '';
        var age_cond = ['21〜25歳', '26〜30歳', '31〜35歳', '36〜40歳', '41〜45歳', '46〜50歳'];
        $("button[type=submit]").css({
            'pointer-events': 'none',
            'opacity': '0.7'
        });
        if ((status == '正社員' && !['400万円未満', '400万円～500万円'].includes(salary) && age_cond.includes(age)) || (status == '公務員' && salary != '400万円未満' && age_cond.includes(age)) || (location.pathname.indexOf('priority-webinar') != -1) || (location.pathname.indexOf('change-webinar') != -1)) {
            $('form').off('submit');
            reduceVacantSeat();
        } else {

            $('form').off('submit');
            $('form').submit();
            if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 && userAgent.indexOf('edge') === -1) {
                $('body').append('<div id="loading"><div class="inner"><p class="loding-text">ただいま処理中です...<br>完了ページが表示されるまでお待ちください。</p></div></div>');
            } else {
                $('body').append('<div id="loading"><div class="inner"><div class="dot-spin"></div><p class="loding-text">ただいま処理中です...<br>完了ページが表示されるまでお待ちください。</p></div></div>');
            }
        };
        return false;
    });
};

function reduceVacantSeat() {
    var seminarId = $("#Userseminar option:selected").data('id');
    var region = $("#Userseminar option:selected").data('region');
    //for output log
    var seminarName = $("#Userseminar").val();
    var name1 = $('#Username1').val();
    var name2 = $('#Username2').val();
    var email = $('#Usermail').val();
    var tel = $('#Usertel').val();
    // ajax
    $.ajax({
        type: 'POST',
        url: ajaxUrl,
        dataType: "json",
        data: {
            'action': 'webinarSeat',
            'seminarId': seminarId,
            'name1': name1,
            'name2': name2,
            'email': email,
            'tel': tel,
        },
        success: function (data) {
            if (data.seat > 0) {
                $('form').append('<input type="hidden" name="data[User][zoom_room_number]" value="' + data.zoomnumber + '">');
                $('form').append('<input type="hidden" name="data[User][zoom_webinar_url]" value="' + data.zoomurl + '">');
                $('form').append('<input type="hidden" name="data[User][zoom_mailadress]" value="' + data.user_mail + '">');
                $('form').submit();

                if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1 && userAgent.indexOf('edge') === -1) {
                    $('body').append('<div id="loading"><div class="inner"><p class="loding-text">ただいま処理中です...<br>完了ページが表示されるまでお待ちください。</p></div></div>');
                } else {
                    $('body').append('<div id="loading"><div class="inner"><div class="dot-spin"></div><p class="loding-text">ただいま処理中です...<br>完了ページが表示されるまでお待ちください。</p></div></div>');
                }
                return false;
            } else {
                $('.entrybox').prepend('<p class="form-error">お申し込みいただいた日程は満席の可能性があります。画面をリロードしていただき再度お申し込みください。</p>');
                $("button[type=submit]").css({
                    'pointer-events': 'auto',
                    'opacity': '1'
                });
                checkStatus();
            }
        },
        error: function () {
            $('#submit-error').show();
            $("button[type=submit]").css({
                'pointer-events': 'auto',
                'opacity': '1'
            });
            checkStatus();
        }
    })

}


