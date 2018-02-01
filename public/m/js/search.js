
// 创建一个全局变量
var letao = null;
window.addEventListener('load',function(){
    letao = new Letao();
    letao.addHistory();

})
var Letao = function () {

}
Letao.prototype = {
    // 添加历史记录
    addHistory:function(){
        $('.btn-search').on('click',function(){
            // 获取搜索框的文本
            var search = $('.text').val();
            //获取本存储对象转换成JSON对象 如果没有给个空数组
            var historyData = JSON.parse(localStorage.getItem('historyData')||'[]');
            console.log(historyData);
            // 如果没有内容提示输入
            if(!search){
                alert('请输入搜索的物品');
                return false;
            }
            // 定义一个ID 为数组的长度
            // 获取最后一个对象的id+1 如果没有这个对象默认为1
            var id=0;
            if(historyData.length==0){
                id=1;
            }else {
                id=historyData[historyData.length-1].id+1;
            }
            
            // 创建一个对象
            var obj = {"id":id,"search":search};

            // 如果有内容就添加到数组中去
            historyData.push(obj);

            // 添加到本地存储 要转换成字符串格式
            localStorage.setItem("historyData",JSON.stringify(historyData));

            // 重新渲染到页面
            letao.selectHistory()

        })
    },
    // 查询历史记录
    selectHistory:function(){
        // 查询本地存储历史记录转换成JSO对象 才能拿来使用
        var historyData = JSON.parse(localStorage.getItem('historyData')||'[]');

        // 如果需要反转 把数组反转反转一下
        historyData = historyData.reverse();
        
        // 渲染到页面
        var html =  template('historyData',{'rows':historyData});
        $('.search-history-body').html(html);

    }
}