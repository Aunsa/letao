var letao = null;
window.addEventListener('load',function(){
    letao = new Letao ();
    letao.render();
    letao.searchCommodity();
    letao.commoditySort();
    letao.Details();
    search= getQueryString('search')
    // console.log(search);
})
var search = "";
var page = 1;
var Letao = function (){

}

Letao.prototype = {
    // 页面刷新
    render:function (){
     letao.pageRefresh(downCallback,upCallback);
        // 下拉刷新回调函数
       function downCallback() {
           letao.getData({
               proName:search,
               page:1,
               pageSize:2
           },function(data){
                //模拟网络延迟 下拉刷新一秒后显示数据
                // console.log(data);
                setTimeout(function(){
                    var html = template('product',data);
                    // console.log(html);
                    $('.product-list-body .mui-row').html(html);
                    // 加载完结束下拉刷新
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    // 每次下拉刷新要把page充值为1
                    page = 1;
                    // 上拉加载在无法再次上拉刷新加载 要重置上拉加载
                    mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                },500)
           })
       }
       //上拉刷新回调函数
       function upCallback() {
        // //每次上拉刷新让page++
        page++
        // // 调用功能获取商品数据
        letao.getData({
           proName:search,
           page:page,
           pageSize:2
        },function(data){
            // console.log(data);
            setTimeout(function(){
                if(data.data.length<=0){
                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                    return;
                }else{
                    var html = template('product',data)
                    $('.product-list-body .mui-row').append(html);
                    // 加载完结束下上拉刷新
                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                }
           
            },500)    
        })
        }       
    },
    //封装公共请求的数据函数
    getData:function(options,callback) {
        // 默认第几页码数 如不不传 为第一页
        options.page = options.page ||1 ;
        // 默认每一页的条数 如果不传 为两条
        options.pageSize = options.pageSize ||2;
        $.ajax({
            url: "/product/queryProduct",
            data:options,
            success:function(data){
             callback&&callback(data);
            }
        })
    },
    // 封装公用页面刷新
    pageRefresh:function(downCallback,upCallback){
        mui.init({
            pullRefresh : {
              container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
              down : {
                auto: true,//可选,默认false.首次加载自动下拉刷新一次
                height:50,//可选.默认50.触发上拉加载拖动距离
                // auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                callback :downCallback
              },
              up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                // auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback :upCallback//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
              }
            },
          });
    },
    // 搜索商品列表
    searchCommodity:function(){
        // 点击事件
        $('.btn-search').on('click',function(){            
            // 获取当前搜索的文本
                search = $('.search-input input').val();      
            letao.getData({
                proName:search,
                page:1,
                pageSize:5
            },function(data){
                // console.log(data);                        
                var html = template('product',data);
                $('.product-list-body .mui-row').html(html);
                // 加载完结束下拉刷新
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
    
            })
        })
    },
    //商品排序
    commoditySort:function(){
        // 在上拉下拉刷新页面里 mui阻止的点击事件 所用使用tap singleTap
        $('.product-list-title a').on('tap',function(){
            // 排他
            $('.product-list-title div').removeClass('active');
            // 给点击的高亮
            $(this).parent().addClass('active');
            // 获取点击a的排序方式 是升序 还是降序    
            var sort = $(this).data('sort');
            // console.log(sort);
            // 获取点击的排序是什么方式的
            var sortType =$(this).data('sort-type');
            
            if(sort==1){
                $(this).data('sort',2)
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up')
            }else{
                $(this).data('sort',1)
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down')
            }
            // 判断给谁排序
            if(sortType == 'price'){
                letao.getData({
                    proName:search,
                    page:1,
                    pageSize:5,
                    price:sort,    
                },function(data){
                    var html = template('product',data);
                    console.log(html);
                    $('.product-list-body .mui-row').html(html);
                })
            }else if(sortType == 'num'){
                letao.getData({
                    proName:search,
                    page:1,
                    pageSize:5,
                    num:sort
                },function(data){
                    var html = template('product',data);
                    $('.product-list-body .mui-row').html(html);
                })
            }
        })
    },
    // 点击商品调到详情页面
    Details:function(){
        $('.product-list-body').on('tap','.btn-buy',function(){
            var id = $(this).data('id');
            // console.log(id);
            window.location.href="details.html?id="+id;
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
