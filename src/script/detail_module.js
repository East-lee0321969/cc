define(['jcookie'], () => {
    return {
        init: function() {
            //1.通过地址栏获取列表页面传入的sid。

            let $sid = location.search.substring(1).split('=')[1];
            console.log($sid);
            if (!$sid) {
                $sid = 1;
            }

            $.ajax({
                url: 'http://192.168.64.3/dashboard/jiuxian/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                // console.log(data);
                $('#smallpic').attr('src', data.url);
                $('#bpic').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);

                //小图
                let $picurl = data.urls.split(',');
                let $strhtml = '';
                const $list = $('#list');
                console.log($picurl);
                $.each($picurl, function(index, value) {
                    $strhtml += `
                <li>
                    <img src="${value}"/>
                </li>
            `;
                });
                $list.html($strhtml);
            });

            //放大镜效果
            const $spic = $('#spic'); //小图
            const $bpic = $('#bpic'); //大图
            const $sf = $('#sf'); //小放
            const $bf = $('#bf'); //大放
            const $left = $('#left'); //左箭头
            const $right = $('#right'); //右箭头
            const $list = $('#list'); //小图列表
            const $inif = $('.goodsinfo');

            //小图/大图=小放/大放
            $sf.width($spic.width() * $bf.width() / $bpic.width());
            $sf.height($spic.height() * $bf.height() / $bpic.height());
            let $bili = $bpic.width() / $spic.width();
            $spic.hover(function() {
                $sf.css('visibility', 'visible');
                $bf.css('visibility', 'visible');
                $(this).on('mousemove', function(ev) {
                    let $leftvalue = ev.pageX - $inif.offset().left - $sf.width() / 2;
                    let $topvalue = ev.pageY - $inif.offset().top - $sf.height() / 2;
                    if ($leftvalue < 0) {
                        $leftvalue = 0
                    } else if ($leftvalue >= $spic.width() - $sf.width()) {
                        $leftvalue = $spic.width() - $sf.width()
                    }
                    if ($topvalue < 0) {
                        $topvalue = 0
                    } else if ($topvalue >= $spic.height() - $sf.height()) {
                        $topvalue = $spic.height() - $sf.height()
                    }

                    $sf.css({
                        left: $leftvalue,
                        top: $topvalue
                    });

                    $bpic.css({
                        left: -$leftvalue * $bili,
                        top: -$topvalue * $bili
                    });
                })
            }, function() {
                $sf.css('visibility', 'hidden');
                $bf.css('visibility', 'hidden');
            });


            //渲染小图
            $list.on('mouseover', 'li', function() {
                let imgurl = $(this).find('img').attr('src');
                $('#smallpic').attr('src', imgurl);
                $('#bpic').attr('src', imgurl);
            });

            let $num = 6;
            $right.on('click', function() {
                let $lists = $('#list li');
                if ($lists.size() > $num) {
                    $num++;
                    $left.css('color', '#333');
                    if ($lists.size() == $num) {
                        $right.css('color', '#fff');
                    }

                    //列表运动
                    $('#list ul').animate({
                        left: -($num - 6) * $lists.eq(0).outerWidth(true)
                    });
                }
            });
            $left.on('click', function() {
                let $lists = $('#list ul li');
                if ($num > 6) {
                    $num--;
                    $right.css('color', '#333');
                    if ($num <= 6) {
                        $left.css('color', '#fff');
                    }
                    $('#list ul').animate({
                        left: -($num - 6) * $lists.eq(0).outerWidth(true)
                    });
                }
            });

            //购物车
            let arrsid = []; //存储商品的sid
            let arrnum = []; //数量

            //判断第一次还是第二次
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }

            $('.p-btn a').on('click', function() {
                getcookietoarray();
                if ($.inArray($sid, arrsid) === -1) {
                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else {

                    //通过$sid获取商品的数量所在的位置。
                    let $index = $.inArray($sid, arrsid);
                    //原来的数量+新加的数量进行重新赋值，添加cookie
                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#count').val()); //重新赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
                alert('按钮被点击了');
            });
        }
    }

});