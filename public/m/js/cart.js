var letao = null;
window.addEventListener('load',function(){
    letao = new Letao();
    letao.selectCart();
    letao.deleteCart();
    letao.updataCart();
    letao.countAmount();
})

var Letao = function(){

}
Letao.prototype = {
    // 查询信息
    selectCart:function(){
        $.ajax({
            url:'/cart/queryCart',
            success:function(data){
               if(data.error){
                   window.location.href = "login.html"; 
               }else{
                   console.log(data);
                   var html = template('cartProductTmp',{'rows':data})                  
                   $('#main').html(html);
               }
            }
        })
    },
    // 删除商品
    deleteCart:function(){
        $('#main').on('click','.btn-delete',function(){
            var id = $(this).parent().data('id')
            mui.confirm('请确认是否删除','温馨提示',['否','是'],function(e){
                // console.log(e.index);
                if(e.index==1){
                    $.ajax({
                        url:'/cart/deleteCart',
                        data:{
                            'id':id,
                        },
                        success:function(data){
                            letao.selectCart();
                        }
                    })
                }
            })            
        })
    },
    // 编辑商品
    updataCart:function(){
        $('#main').on('click','.btn-updata',function(){
        // 获取商品的详情
        var id = $(this).parent().data('id');
        var num = $('.product-num').data('num');
        var productNum = $('.product-num').data('productnum');
        var size = $('.product-size').data('size');
        var productsize = $('.product-size').data('productsize');
        // console.log(productsize);
        var start = productsize.split('-')[0];
        var end = productsize.split('-')[1];
        productsize = [];
        for(var i =start; i<end ;i++){
            productsize.push(parseInt(i));
        }
        // console.log(productsize);
        
        var data = {
            "num":num,
            "productNum":productNum,
            "size":size,
            "productsize":productsize,
        }
        // 生成模板
        var html = template('editCartProductTmp',data)
        // 去空格
        html = html.replace(/(\r)?\n/g, "");
        console.log(html);
        mui.confirm(html,function(e){
            if(e.index==1){
                // 如果确认修改拿到修改的数量和尺码数
                var newNum = mui('.mui-numbox').numbox().getValue();
                var newSize = $('.btn-size.active').data('size');
                $.ajax({
                    url:'/cart/updateCart',
                    data:{
                        'id':id,
                        'size':newSize,
                        'num':newNum,
                    },
                    type:'post',
                    success:function(data){
                        console.log(data);
                        letao.selectCart();
                    }
                })
            }
        })
        // 等100毫秒初始化数字框
        setTimeout(function() {
            mui('.mui-numbox').numbox();
        }, 100);
        // 给所有的尺码点击
        $('body').on('click','.btn-size',function(){
            // 排他
            $('.btn-size').removeClass('active');
            $(this).addClass('active');
        })        
        })
    },
    // 计算总金额
    countAmount:function(){
        $('#main').on('click','.product-options>input',function(){
            // 获取页面上所有被选中的复选框
            var checkedProudct = $('input:checked');
            console.log(checkedProudct);
            
            // 总金额
            var sum = 0;
            for(var i=0; i<checkedProudct.length; i++){
                var num = $(checkedProudct[i]).data('num');
                var price = $(checkedProudct[i]).data('price');
                var count = num*price
                sum+=count;
            }
            sum = (parseInt(sum*10))/10
            $('.count').html(sum);
        })
    }
}