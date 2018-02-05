var letao = null;
window.addEventListener('load',function(){
    letao = new Letao();
    letao.login();
})

var Letao = function (){

}
Letao.prototype = {
    login:function(){
        $('.btn-login').on('click',function(){
            var userName = $('.username').val();
            var password = $('.password').val();
            if(!userName){
               mui.toast('请输入用户名',{duration:'long',type:'div'});
               return; 
            }
            if(!userName){
                mui.toast('请输入密码',{duration:'long',type:'div'});
                return; 
            }
            $.ajax({
                url: ' /user/login',
                data: {
                    'username': userName,
                    'password': password
                },
                type: "post",
                success: function (data) {
                    console.log(data);
                    if (data.success) {
                        window.location.href = "user.html";
                    }else {
                        mui.toast(data.message,{duration:'long',type:'div'});
                    }
                }
            })
        })
        
	}
}