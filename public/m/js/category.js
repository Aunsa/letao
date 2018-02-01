window.addEventListener('load',function(){
    var letao = new Letao();
    letao.scroll();
    letao.getCategoryLeft();
    letao.getCategoryRight();
})


var Letao = function () {

}

Letao.prototype = {
    // 滑动的初始化
    scroll:function () {
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: false, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
            bounce: true //是否启用回弹
        });
    },
    // 分类左侧动态渲染
    getCategoryLeft:function(){
        $.ajax ({
            url:" /category/queryTopCategory",
            success:function(data) {
                // console.log(data);
                var html = template('categoryLeft',data);
                // console.log(html);
                $('.category-left ul').html(html);
                $('.category-left ul li').eq(0).addClass('active');
            }
        })
    },

    getCategoryRight:function(){
        // 给每个li添加点击事件
        $('.category-left').on('click',' ul li a',function(){
            // console.log('1');
            $(this).parent().siblings().removeClass('active')
            $(this).parent().addClass('active');
            var id =$(this).data('id');
            // 拿到当前分类的Id
            getData(id)
        });
        getData(1)
        function getData(id) {
            $.ajax({
                url: "/category/querySecondCategory",
                data: {
                    "id":id
                },
                success: function (data) {
                    console.log(data);
                    var html = template('categoryRight',data)
                    $('.list .mui-row').html(html);
                }
            })
        }
    }
}