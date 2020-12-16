define([], () => {
    return {
        init: function() {
            //获取元素
            const $banner = $('.banner');
            const $ulist = $('.wrap_list');
            const $piclist = $('.lunbo');
            const $btnlist = $('.wrap_ol li');
            const $item_list = $('.item_list li')
            const $menu = $('.menu .item');
            let $num = 0;
            let timer = null;

            //轮播图
            //鼠标移入按钮改变颜色，图片改变
            $btnlist.on('mouseover', function() {
                $num = $(this).index();
                $(this).addClass('active').siblings('li').removeClass('active');
                $piclist.eq($(this).index()).addClass('show').siblings('.lunbo').removeClass('show');
            })

            //鼠标移入停止运动
            $ulist.hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(function() {
                    $num++;
                    //判断索引
                    if ($num === $btnlist.size()) {
                        $num = 0;
                    }
                    $btnlist.eq($num).addClass('active').siblings('li').removeClass('active');
                    $piclist.eq($num).addClass('show').siblings('.lunbo').removeClass('show');
                }, 3000);
            })

            //打开定时器
            timer = setInterval(function() {
                $num++;
                //判断索引
                if ($num === $btnlist.size()) {
                    $num = 0;
                }
                $btnlist.eq($num).addClass('active').siblings('li').removeClass('active');
                $piclist.eq($num).addClass('show').siblings('.lunbo').removeClass('show');
            }, 3000);


            //二级菜单

            $item_list.hover(function() {
                $menu.show();
                $(this).addClass('active').siblings('li').removeClass('active');
                $menu.eq($(this).index()).show().siblings('.item').hide();
            }, function() {
                $menu.hide();
            })
            $menu.hover(function() {
                $(this).show();
            }, function() {
                $(this).hide();
            });


            //楼梯效果
            const $stairway = $('.stairway');
            const $stair = $('.stairway li').not('.last');
            const $whitej = $('.whitej');

            function scroll() {
                var $scrolltop = $(window).scrollTop(); //获取滚动条的top值
                if ($scrolltop >= 1234) {
                    $stairway.show();
                } else {
                    $stairway.hide();
                }
                $whitej.each(function(index, element) {
                    //console.log($(element).offset().top);
                    var $whitejtop = $(element).offset().top;
                    if ($whitejtop >= $scrolltop) {
                        $stair.removeClass('active');
                        $stair.eq(index).addClass('active').siblings('li');
                        $('.floor').css('opacity', 1);
                        return false;
                    }
                })
            }
            scroll();


            $(window).on('scroll', function() {
                scroll();
            });


            $stair.on('click', function() {
                //$(window).off('scroll');
                //求出每个楼层的top值。
                $(this).addClass('active').siblings('li').removeClass('active');
                var $whitejtop = $whitej.eq($(this).index()).offset().top;
                $('html').animate({
                    scrollTop: $whitejtop
                }, function() {
                    $(window).on('scroll', function() {
                        scroll();
                    });
                });
            });


            //回到顶部
            $('.last').on('click', function() {
                $('html').animate({
                    scrollTop: 0
                });
            });










            $.ajax({
                url: 'http://192.168.64.3/dashboard/jiuxian/php/index1.php',
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                <li>
                        <img src="${value.url}"/>
                        <p>${value.title}</p>
                        <span>￥${value.price}</span>
                </li>
            `;
                });
                $('.whitej').html($strhtml);
            });
        }
    }
});