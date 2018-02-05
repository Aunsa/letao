// 创建一个全局变量
var letao = null;
window.addEventListener('load',function(){
    letao = new Letao();
    letao.register();
})
var Letao = function () {

}
Letao.prototype = {
    register:function(){
        // 点击获取验证码
        var vCode = "";
        $('.btn-vCode').on('click',function(){
            $.ajax({
                url:"/user/vCode",
                success:function(data){
                    vCode = data.vCode
                    $('.vCode').val(vCode);
                }
            })
        })
        // 注册用户
        $('.btn-register').on('click',function(){
            // 获取文本信息
            var username = $('.username').val()
            var mobile = $('.mobile').val()
            var password1 = $('.password1').val()
            var password2 = $('.password2').val()
        
            if(!username){
                mui.toast('请输入用户名',{duration:'long',type:'div'});
                return;
            }
            if(!mobile){
                mui.toast('请输入手机号码',{duration:'long',type:'div'});
                return;
            }
            if(!password1){
                mui.toast('请输入密码',{duration:'long',type:'div'});
                return;
            }
            if(!password2){
                mui.toast('请确认密码',{duration:'long',type:'div'});
                return;
            }
        
            $.ajax({
                url:'/user/register',
                data:{
                    username:username,
                    password:password1,
                    mobile:mobile,
                    vCode:vCode
                },
                type:"post",
                success:function(data){
                    if(data.success){
                        window.location.href = "login.html"
                    }else{
                        console.log(data);
                        mui.toast(data.message,{duration:'long',type:'div'});
                    }
                }
            })
        })
      
    }
}