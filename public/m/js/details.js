var letao = null;
var id = "";
window.addEventListener('load',function(){
    id = getQueryString('id');
    letao = new Letao();
    letao.getProductDetail();
    // console.log(id);
})

var Letao = function(){

}
Letao.prototype = {
    // 轮播图初始化
    detailsSilder:function() {
          //获得slider插件对象
          var gallery = mui('.mui-slider');
          gallery.slider({
              interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
          });   
    },
    // 获取商品详情的函数
    getProductDetail:function(){
        $.ajax({
            url:'/product/queryProductDetail',
            data:{
                'id':id
            },
            success:function(data){
                // console.log(data);
               var html = template('slideDetailTmp',data)
               $('#slide .mui-slider').html(html);
               var first = $('.mui-slider-group .mui-slider-item:first-of-type').clone().addClass('mui-slider-item-duplicate');
               var last = $('.mui-slider-group .mui-slider-item:last-of-type').clone().addClass('mui-slider-item-duplicate');
                // 克隆第一张图片添加到最后面
                $('#slide .mui-slider-group').append(first);
                // 克隆最后一张图片添加到前面
                $('#slide .mui-slider-item:first-of-type').before(last);
                // 初始化轮播图
                letao.detailsSilder();
                // 渲染商品详情
                var start = data.size.split('-')[0];
                var end = data.size.split('-')[1];
                data.size = [];
                for(var i =start; i<end; i++){
                    data.size.push(parseInt(i))
                }
                // console.log(data);
                var html = template('productDetailTmp',data);
                 $('.product').html(html);
                //  初始化数字框 传入数字框容器的选择器
                 mui('.mui-numbox').numbox();

                //  给鞋码数加个点击事件
                $('.product').on('click','.product-size span',function(){
                    $('.product-size span').removeClass('active');
                    $(this).addClass('active');
                })

                // 给数量按钮加个点击事件
                var num = $('.num-input').val();
                var sum = $('.num').html()
                $('.product').on('click','.btn-sub',function(){
                    if(num<=0){
                        num=num;
                        return
                    }
                    num--
                    $('.num-input').val(num)
                })
                $('.product').on('click','.btn-add',function(){
                    if(num>=sum){
                        num=num;
                        return
                    }
                    num++
                    $('.num-input').val(num)
                })
                $('.mui-btn-danger').on('click',function(){
                    var pageSize = $('.product-size span.active').html();
                     num =  $('.num-input').val()
                    if(!pageSize){
                        mui.toast('请选择鞋码',{duration:'long',type:'div'});
                        return;
                    }
                    if(!num){
                        mui.toast('请选择购买的数量',{duration:'long',type:'div'});
                        return;
                    }
                    $.ajax({
                        url:'/cart/addCart',
                        data:{
                            productId:id,
                            num:num,
                            size:pageSize
                        },
                        type:'post',
                        success:function(data){
                            // 如果出错打回登录页面
                            console.log(data);
                            if(data.error){
                               mui.confirm('请先登录，是否去登录','温馨提示的标题',['不去','去'],function(e){
                                console.log(e.index);
                                if(e.index==1){
                                        window.location.href = 'login.html';
                                   }
                               })
                            }else{
                                mui.toast('添加成功',{duration:'long',type:'div'})
                            }
                            
                        }
                    })

                })
            }
        })
    }
}

// 获取其他页面传过来的数据
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}