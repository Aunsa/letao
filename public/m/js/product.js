var letao = null;
window.addEventListener('load',function(){
    letao = new Letao ();
    letao.render();
})

var Letao = function (){

}

Letao.prototype = {
    // 渲染页面
    render:function (){
        $.ajax({
           url: "/product/queryProduct",
           data:{
            page:1,
            size:5
           },
           success:function(data){
            console.log(data);
           }
        })
    }
}