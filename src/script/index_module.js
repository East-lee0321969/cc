define([], () => {
    return {
        init: function() {
            //获取元素
            // const $banner = $('.banner');
            // const $ulist = $('.banner ul'); 
            // const $piclist = $('.banner ul li');
            // const $btnlist = $('.banner ol li');
             const $white=$('.white_right ul')
            // let timer=null;
            // let $num=0;

            //鼠标移入按钮改变颜色，图片改变
            // $btnlist.on('click',function(){
            //     $num=$(this).index();
            //     $btnlist.addClass('active').siblings('li').removeClass('active');
            // })
            $.ajax({
                url: 'http://localhost:8080/dashboard/projectname/php/index1.php',
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
               $white.html($strhtml);
            });
    }
}
});