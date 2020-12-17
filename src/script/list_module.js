define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {
            const $list = $('.content ul');
            const $btn1 = $('.btn1');
            const $btn2 = $('.btn2');
            const $btn3 = $('.btn3');
            let $array_default = [];
            let $array = [];
            let $prev = [];
            let $next = [];
            //1.渲染列表页面
            $.ajax({
                url: 'http://192.168.64.3/dashboard/jiuxian/php/listdata.php',
                dataType: 'json'
            }).done(function(datalist) {
                console.log(datalist);
                data = datalist.pagedata; //获取接口里面数据
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}">
                                <img class="lazy" data-original="${value.url}"/>
                                <p>${value.title}</p>
                                <span>￥${value.price}</span>
                            </a>
                        </li>
                    `;
                });
                $list.html($strhtml);
                //懒加载
                $("img.lazy").lazyload({ effect: "fadeIn" });

                //将li元素添加到排序前的数组中。
                $array_default = [];
                $array = [];
                $('.list li').each(function(index, element) {
                    $array_default[index] = $(this);
                    $array[index] = $(this);
                });
                console.log($array_default);


                $('.page').pagination({
                    pageCount: datalist.pageno,
                    jump: true,
                    prevContent: '上一页',
                    nextContent: '下一页',
                    callback: function(api) {
                        console.log(api.getCurrent());
                        $.ajax({
                            url: 'http://192.168.64.3/dashboard/jiuxian/php/listdata.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(datalist) {
                            data = datalist.pagedata;
                            let $strhtml = '';
                            $.each(data, function(index, value) {
                                $strhtml += `
                                        <li>
                                            <a href="detail.html?sid=${value.sid}">
                                                <img class="lazy" data-original="${value.url}"/>
                                                <span>￥${value.price}</span>
                                                <a>${value.title}</a>
                                            </a>
                                        </li>
                                    `;
                            });
                            $list.html($strhtml);
                            //懒加载
                            $("img.lazy").lazyload({ effect: "fadeIn" });


                            $('.list li').each(function(index, element) {
                                $array_default[index] = $(this);
                                $array[index] = $(this);
                            });
                            console.log($array_default);
                        });
                    }
                });


                //3.点击按钮进行排序
                $btn1.on('click', function() {
                    //遍历渲染。
                    $.each($array_default, function(index, value) {
                        $list.append(value);
                    });
                });
                $btn2.on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('span').html().substring(1));
                            $next = parseFloat($array[j + 1].find('span').html().substring(1));
                            if ($prev > $next) {
                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) {
                        $list.append(value);
                    });
                });

                $btn3.on('click', function() {
                    for (let i = 0; i < $array.length - 1; i++) {
                        for (let j = 0; j < $array.length - i - 1; j++) {
                            $prev = parseFloat($array[j].find('span').html().substring(1));
                            $next = parseFloat($array[j + 1].find('span').html().substring(1));
                            if ($prev < $next) {

                                let temp = $array[j];
                                $array[j] = $array[j + 1];
                                $array[j + 1] = temp;
                            }
                        }
                    }
                    //遍历渲染。
                    $.each($array, function(index, value) {
                        $list.append(value);
                    });
                });


            });
        }
    }
});