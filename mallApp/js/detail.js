/**
 * Created by dell on 2017/7/31.
 */
$('#leftBtn').on('click', function() {
    window.location.href = '../list/list.html';
});
var goodsId = fnBase.request("pId");
$.ajax({
    type: 'GET',
    url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
    data: {
        "goodsID": goodsId
    },
    dataType: 'jsonp',
    success: function(data) {
        // console.log(data)
        var imgsUrl = JSON.parse(data[0].imgsUrl);
        var newPrice = 0;
        if(data[0].discount !=0) {
            newPrice = parseFloat(Math.round((data[0].price * (data[0].discount/10))));
        } else {
            newPrice = data[0].price;
        }
        var html = '';
        $.each(imgsUrl, function(index, ele){
            html +=
                '<div class="swiper-slide">'+
                    '<img src="'+ele+'" alt="">'+
                '</div>'
        });
        var str ='';
        str +=
            '<div class="swiper-container" style="width:180vw;margin-left: -40vw;position:relative">'+
                '<div class="swiper-wrapper">'+html+'</div>'+
                '<!--如果需要分页器-->'+
                '<div class="swiper-pagination-my"></div>'+
            '</div>'+

            '<div class="desc">'+
                '<div class="title">'+data[0].goodsName+'</div>'+
                '<div class="price">'+
                    '<span class="newPrice">￥'+newPrice+'</span>'+
                    '<span class="oldPrice">￥'+data[0].price+'</span>'+
                '</div>'+
                '<div class="sellAmount">购买人数 ：'+data[0].buynumber+'</div>'+
            '</div>' ;
        $('.content-top').html(str);
        var mySwiper = $('.swiper-container').swiper({
            slidesPerView: 3,
            loop: true,
            direction:'horizontal',
            autoplay:2000,
            pagination: '.swiper-pagination-my'
        });
    }
});

/*购物车*/
$('.add-shop-cart').on('click', function() {
    $.ajax({
        type: 'GET',
        url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
        data: {
            userID: fnBase.getUserId(),
            goodsID: goodsId,
            number: 1
        },
        success: function(data) {
            console.log(data)
            if(data == 1) {
                alert('该商品已成功添加到购物车');
            }
        }
    })
});
$('.right').on('click', function() {
   window.location.href = '../shopcart/shopcart.html';
});

