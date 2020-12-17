define([], function() {
    return {
        init: function() {
            const $tel = $('#telphone');
            const $password = $('#password');
            const $login = $('#login'); //登录按钮
            const $span1 = $('.ban_1');
            const $span2 = $('.ban_2');



            $tel.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    let $reg = /^1[3|5|8]\d{9}$/;
                    if ($reg.test($value)) {
                        $span1.html('✅').css('color', 'green');
                        $telflag = true;
                    } else {
                        $span1.html('手机号码格式有误').css({ 'color': '#fff', 'background': '#ed787f' });
                        $telflag = false;
                    }
                } else {
                    $span1.html('手机号码不能为空').css({ 'color': '#fff', 'background': '#ed787f' });
                    $telflag = false;
                }
            });

            $login.on('click', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.64.3/dashboard/jiuxian/php/login.php',
                    data: {
                        tel: $tel.val(),
                        pass: $password.val()
                    }
                }).done(function(data) {
                    if (!data) {
                        alert('用户名或者密码有误!');
                        $password.val('');
                    } else {
                        location.href = 'index.html';
                    }
                })
            });
        }
    }
})