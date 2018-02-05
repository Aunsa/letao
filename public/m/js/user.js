var letao = null;
window.addEventListener('load',function(){
    letao = new Letao();
    letao.userMessage();
    letao.outLogin();
})
var Letao = function () {

}
Letao.prototype = {
    // 查询个人信息 判断是否登录
    userMessage:function (){
        $.ajax({
            url:'/user/queryUserMessage',
            success:function(data){
                if(data.error){
                    window.location.href = "login.html"
                }else {
                    console.log(data);
                    var html = template('userMessageTmp',data)
                    console.log(html);
                    $('#main').html(html);
                    // 登录成功渲染用户信息
                }
            }
        })
    },

    // 退出登录
    outLogin:function(){
        $('#main').on('click','.btn-exit',function(){
            $.ajax({
                url:"/user/logout",
                success:function(data){
                    if(data.success){
                        window.location.href = "login.html"
                    }
                }
            })
        })
    }
}