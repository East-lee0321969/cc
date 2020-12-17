define([], function() {
    return {
        init: function() {
            const $form = $('.ban_form');
            const $tel = $('#tel');
            const $password = $('#password');
            const $confirm = $('#confirm');
            const $check = $('#checked');
            const $span = $('.reg_span');

            let $telflag = true;
            let $passflag = true;
            let $firmflag = true;
            let $checkflag = true;


            //手机
            $tel.on('focus', function() {
                $span.eq(0).html('请输入11位正确的手机号码').css({ 'color': '#fff', 'background': '#cdcdcd' });
            });

            $tel.on('blur', function() {
                let $value = $(this).val();
                if ($value !== '') {
                    let $reg = /^1[3|4|5|7|8]\d{9}$/;
                    if ($reg.test($value)) {
                        $span.eq(0).html('✅').css({ 'color': 'green', 'background': '#fff' });
                        $telflag = true;
                        //判断唯一值
                        $.ajax({
                            type: 'post',
                            url: 'http://192.168.64.3/dashboard/jiuxian/php/reg.php',
                            data: {
                                telphone: $tel.val()
                            }
                        }).done(function(data) {
                            if (!data) { //不存在
                                $span.eq(0).html('✅').css('color', 'green');
                            } else { //存在
                                $span.eq(0).html('该用户名已存在').css({ 'color': '#fff', 'background': '#ed787f' });
                            }
                        });

                    } else {
                        $span.eq(0).html('手机号码格式有误').css('color', 'red');
                        $telflag = false;
                    }
                } else {
                    $span.eq(0).html('请输入手机号').css({ 'color': '#fff', 'background': '#ed787f' });
                    $telflag = false;
                }
            });

            //密码
            $password.on('focus', function() {
                $span.eq(1).html('8-20位字符，数字、字母、符号至少包含两种').css({ 'color': '#fff', 'background': '#cdcdcd' });
            })

            $password.on('input', function() {
                let $value = $(this).val();
                if ($value.length >= 2 && $value.length <= 20) {
                    let $regnum = /\d+/;
                    let $reguppercase = /[A-Z]+/;
                    let $reglowercase = /[a-z]+/;
                    let $other = /[\W_]+/;
                    let $count = 0;
                    if ($regnum.test($value)) {
                        $count++;
                    }
                    if ($reguppercase.test($value)) {
                        $count++;
                    }
                    if ($reglowercase.test($value)) {
                        $count++;
                    }
                    if ($other.test($value)) {
                        $count++;
                    }
                    switch ($count) {
                        case 1:
                            $span.eq(1).html('弱').css({ 'color': 'red', 'background': '#fff' });
                            $passflag = false;
                            break;
                        case 2:
                        case 3:
                            $span.eq(1).html('中').css({ 'color': 'orange', 'background': '#fff' });
                            $passflag = true;
                            break;
                        case 4:
                            $span.eq(1).html('强').css({ 'color': 'green', 'background': '#fff' });
                            $passflag = true;
                            break;

                    }
                } else {
                    $span.eq(1).html('密码长度有误').css({ 'color': '#fff', 'background': '#ed787f' });
                    $passflag = false;
                }
            });
            $password.on('blur', function() {
                if ($(this).val() !== '') {
                    if ($passflag) {
                        $span.eq(1).html('✅').css('color', 'green');
                    }
                } else {
                    $span.eq(1).html('密码不能为空').css({ 'color': '#fff', 'background': '#ed787f' });
                }
            })

            //确认密码

            $confirm.on('focus', function() {
                $span.eq(2).html('请再次输入密码').css({ 'color': '#fff', 'background': '#cdcdcd' });
            })

            $confirm.on('blur', function() {
                if ($(this).val() === $password.val() && $(this).val() !== '') {
                    $span.eq(2).html('✅').css('color', 'green');
                } else {
                    $span.eq(2).html('请再次输入密码').css({ 'color': '#fff', 'background': '#ed787f' });
                }
            })
















            $form.on('submit', function() {
                if ($tel.val() === '') {
                    $span.eq(0).html('请输入手机号码').css({ 'color': '#fff', 'background': '#ed787f' });
                    $telflag = false;
                }
                if ($password.val() === '') {
                    $span.eq(1).html('请输入密码').css({ 'color': '#fff', 'background': '#ed787f' });
                    $passflag = false;
                }
                if ($confirm.val() === '') {
                    $span.eq(2).html('请再次输入密码').css({ 'color': '#fff', 'background': '#ed787f' });
                    $firmflag = false;
                }
                // if ($check.prop('checked')) {
                //     $span.eq(3).html('请接受服务协议！').css({ 'color': '#fff', 'background': '#ed787f' });
                //     $checkflag = false;
                // }
                if (!$telflag || !$passflag || !$firmflag) {
                    return false;
                }
                console.log($span);
            })
        }
    }
});