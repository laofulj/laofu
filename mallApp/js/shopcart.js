/**
 * Created by dell on 2017/8/1.
 */
$.ajax({
    type: 'GET',
    url: 'http://datainfo.duapp.com/shopdata/getCar.php',
    data: {
        "userID": fnBase.getUserId()
    },
    dataType: 'jsonp',
    success: function(data) {
         console.log(data)
        if(data.length) {
            var num = 0;
            var sumPrice = 0;
            for(var i = 0; i < data.length; i++) {
                var newPrice = 0;
                if(data[i].discount!=0) {
                    newPrice = fnBase.accMul(data[i].price, (data[i].discount/10));
                }else {
                    newPrice = data[i].price;
                }
                num += parseInt(data[i].number);
                var price = fnBase.accMul(data[i].number, newPrice);
                sumPrice = fnBase.accAdd(sumPrice, price);
            }
        }else {
             $('.content-wrapper').find('.text').show();
             return;
        };
        var html = '';
        html +=
            '<div class="amount-wrapper">'+
                '<span class="title">商品数量：</span>'+
                '<span id="amount" class="amount">'+num+'</span>'+
            '</div>'+
            '<div class="totalPrice-wrapper">'+
                '<span title="title">应付总额（不含运费）：</span>'+
                '<span class="total-price">￥</span>'+
                '<span id="totalPrice" class="total-price">'+sumPrice+'</span>'+
            '</div>';
        $('.desc').html(html);
        var str = '';
        $.each(data, function(index, ele){
            var newPrice = 0;
            if(ele.discount!=0) {
                newPrice = fnBase.accMul(ele.price, ele.discount/10);
            }else {
                newPrice = ele.price;
            };
            str +=
                '<li id="'+ele.goodsID+'">'+
                    '<div class="content-image">'+
                        '<img src="'+ele.goodsListImg+'" alt="">'+
                    '</div>'+
                    '<div class="container">'+
                        '<div class=" con title">'+ele.goodsName+'</div>'+
                        '<div class=" con name">'+ele.className+'</div>'+
                        '<div class=" con price">'+
                            '<span>单价：</span>'+
                            '<span class="uPrice">￥</span>'+
                            '<span class="uPrice uP">'+newPrice+'</span>'+
                        '</div>'+
                        '<div class=" con shop-control">'+
                            '<span>数量：</span>'+
                            '<div class="control">'+
                                '<span class=" con decrease">-</span>'+
                                '<span class="amount">'+ele.number+'</span>'+
                                '<span class="con add">+</span>'+
                            '</div>'+
                        '</div>'+
                        '<div class="del">'+
                            '<i class="icon iconfont">&#xe68d;</i>'+
                        '</div>'+
                    '</div>'+
                '</li>'
        });
        $('.content-list').html(str);
        myScroll.refresh();
    }
});

/*滚动条*/
var myScroll = new IScroll('.content',{
    mouseWheel: true,
    scrollbars: true,
    fadeScrollbars: true,
    click: true,
    shrinkScrolls: 'scale'
});

$('.star').on('click', function() {
    window.location.href = '../list/list.html';
});

window.onload = function() {
    var $contentList = $('#contentList');
    var $aLi = $contentList.find('li');
    var $total = $('#amount');  //总数量
    var $totalPrice = $('#totalPrice');  //总价格
    var total = parseInt($total.html());
    var countPrice = parseFloat($totalPrice.html());

    for (var i =0; i < $aLi.length; i++)  {
        calculate($aLi[i]);
    }

    function calculate(obj) {
        var $decrease =$(obj).find('.decrease');
        var $add = $(obj).find('.add');
        var $uPrice = $(obj).find('.uP');
        var $amount = $(obj).find('.amount');
        var num = parseInt($amount.html());
        var price = parseFloat($uPrice.html());

        /*商品累加*/
        $add.on('click', function() {
           num++;
           $amount.html(num);
           total++;
           countPrice = fnBase.accAdd(countPrice, price);
            $total.html(total);
            $totalPrice.html(countPrice);
        });

        /*商品递减*/
        $decrease.on('click', function() {
            if(num <= 0) return;
            num--;
            $amount.html(num);
            total--;
            countPrice = fnBase.accDec(countPrice, price);
            $total.html(total);
            $totalPrice.html(countPrice);
        });
    };

    //删除商品
    $('.del').on('click', function() {
        var id = $(this).parent().parent()[0].id;
        var $parentLi= $(this);
        $.ajax({
            type: 'GET',
            url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
            data: {
                userID: fnBase.getUserId(),
                goodsID: id,
                number: 0
            },
            success: function(data) {
                console.log(data)
                if(data == 1) {
                    $parentLi.parent().parent().remove();
                    window.location.reload();
                }
            }
        });
    });
};
