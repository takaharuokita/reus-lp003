/* 電話番号　入力エラー用 */
$("input.required-tel").on("blur", function () {
    var error;
    tel = $(".required-tel").val();

    if (tel.length <= 10 || tel.match(/[^0-9]+/)) {
        error = true;
    }
    if (error) {
        if (!$(this).next("span.error").length) {
            $(this).after(
                '<span class="error">半角数字11桁で入力ください</span>'
            );
        }
    } else {
        $(this).next("span.error").remove();
    }
});
/* 電話番号　入力エラー用　ご紹介者様 */
$("input.required-tel-referral").on("blur", function () {
    var error;
    tel = $(".required-tel-referral").val();

    if (tel.length <= 10 || tel.match(/[^0-9]+/)) {
        error = true;
    }
    if (error) {
        if (!$(this).next("span.error").length) {
            $(this).after(
                '<span class="error">半角数字11桁で入力ください</span>'
            );
        }
    } else {
        $(this).next("span.error").remove();
    }
});

/* input　入力エラー用 */
$("input.required").on("blur", function () {
    var error;

    if ($(this).val() === "") {
        error = true;
    }
    if (error) {
        if (!$(this).next("span.error").length) {
            $(this).after('<span class="error">入力してください</span>');
        }
    } else {
        $(this).next("span.error").remove();
    }
});
/* ご住所　入力エラー用 */
$(".required-right").on("change", function () {
    var error;

    if ($(this).val() === "") {
        error = true;
    }
    if (error) {
        if (!$(this).next("span.error-right").length) {
            $(this).after('<span class="error-right">入力してください</span>');
        }
    } else {
        $(this).next("span.error-right").remove();
    }
});
/* select　入力エラー用 */
$("select.required").on("blur", function () {
    var error;

    if ($(this).val() === "") {
        error = true;
    }
    if (error) {
        if (!$(this).next("span.error").length) {
            $(this).after('<span class="error">選択してください</span>');
        }
    } else {
        $(this).next("span.error").remove();
    }
});

/* ご希望エリア　エラー用 */
$(":submit").click(function () {
    if ($("input:checked").val() === undefined) {
        $(".required-area").show();
    } else {
        $(".required-area").hide();
    }
});
$(".required-region").change(function () {
    $(".required-area").hide();
});

/* 日付　エラー用 */
$(".required-date").on("blur", function () {
    var error;

    if ($(this).val() === "") {
        error = true;
    }
    if (error) {
        if (!$(this).next("span.error-date").length) {
            $(this).after(
                '<span class="error-date">日程を入力してください</span>'
            );
        }
    } else {
        $(this).next("span.error-date").remove();
    }
});
$(".required-date").change(function () {
    $("span.error-date").hide();
});
