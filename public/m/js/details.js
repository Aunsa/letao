var letao = null;
var id = "";
window.addEventListener('load',function(){
    letao = new Letao();
    letao.getProductDetail();
    id = getQueryString('id');
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
            // url:'/product/queryProductDetail',
            // data:{
            //     'id':id
            // },
            // success:function(data){
            //     console.log(data);
            // }
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