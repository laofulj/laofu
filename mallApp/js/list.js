/**
 * Created by dell on 2017/7/28.
 */
var sordID = 0;
var iNow = 0;
$.ajax({
    type: 'GET',
    url: ' http://datainfo.duapp.com/shopdata/getclass.php',
    dataType: 'json',
    success: function(data) {
        console.log(data);
        var str = '';
        for(var i = 0; i<data.length; i++) {
            iNow = data[i].classID;
            if (i === sordID) {
                str =
                    '<li class="active">'+
                        '<a href="javascript:"><i class="icon iconfont">'+data[i].icon+'</i></a>'+
                    '</li>';
            } else {
                str +=
                    '<li>'+
                        '<a href="javascript:"><i class="icon iconfont">'+data[i].icon+'</i></a>'+
                    '</li>';
            };
        };
        $('#list').html(str);
    }
});
$('#list').on('click', 'li', function(){
    $(this).addClass('active').siblings().removeClass('active');
});
var listPage = {
    listHtml: '',
    pageNum: 1,
    addData: function(num) {
        listPage.pageNum = num+1;
        $.ajax({
            type: 'GET',
            url: ' http://datainfo.duapp.com/shopdata/getGoods.php',
            dataType: 'jsonp',
            data: {
                pageCode: 0,
                linenumber: 10,
            },
            success: function(data) {
                console.log(data);
                var newPrice = 0;
                $.each(data,function(i,ele){
                    if (data[i].discount != 0) {
                        newPrice = parseFloat(Math.round((data[i].price * (data[i].discount/10))));
                    } else {
                        newPrice = data[i].price;
                    };
                    listPage.listHtml +=
                        '<li onclick="goodsClick('+ele.goodsID+')">'+
                            '<div class="picture">'+
                                '<a href="javascript:"><img src="'+ele.goodsListImg+'" alt=""></a>'+
                            '</div>'+
                            '<div class="desc">'+ele.goodsName+'</div>'+
                            '<div class="price">'+
                                '<span class="newPrice">￥'+newPrice+'</span>'+
                                '<span class="oldPrice">￥'+ele.price+'</span>'+
                            '</div>'+
                        '</li>';
                });
                $('#sectionList').html(listPage.listHtml);
                myScroll.refresh();
            }
        });
    },
    upData: function() {
        listPage.pageNum = 1;
        listPage.listHtml = "";
        listPage.addData();
    }
};
listPage.addData();

var myScroll = new IScroll('.section',{
    mouseWheel: true,
    scrollbars: true,
    fadeScrollbars: true,
    click: true,
    shrinkScrollbars: 'scale'  //是否弹性
});

/*点击切换到详情页*/
function goodsClick(id) {
    window.location.href = '../detail/detail.html?pId='+id;
};

$('.shop-cart').on('click' ,function(){
   window.location.href = '../shopcart/shopcart.html';
});

