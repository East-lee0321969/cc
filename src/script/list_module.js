define([], () => {
    return {
        init: function() {
            const $list = $('.list ul');
            //1.渲染list.html页面
            $.ajax({
                url: 'http://localhost:8080/dashboard/php.cn/html/day29-day31/projectname/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                <li>
                    <a href="detail.html?sid=${value.sid}">
                        <img src="${value.url}"/>
                        <p>${value.title}</p>
                        <span>￥${value.price}</span>
                    </a>
                </li>
            `;
                });
                $list.html($strhtml);
                // $(function() {
                //     $("img.lazy").lazyload({
                //         effect: "fadeIn",
                //     });
                // });
            });
        }
    }
});