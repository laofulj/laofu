/**
 * Created by dell on 2017/7/27.
 */
$('#btn').on('click', function () {
    $.ajax({
        url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
        data: {
            status: "register",
            "userID": $('#userName').val(),
            "password": $('#pass').val()
        },
        dataType: 'json',
        success: function (data) {
            if (data === 0) {
                $('#user').show();
            } else if (data === 1) {
                $('#user').hide();
                if (localStorage.getItem('rememberPW') === 'true') {
                    localStorage.setItem("userID", $('#userName').val());
                    localStorage.setItem("password", $('#pass').val());
                } else {
                    sessionStorage.setItem('userID', $('#userName').val());
                    sessionStorage.setItem('password', $('#pass').val());
                }
                window.location.href = '../login/login.html';
            } else if (data === 2) {
                alert('数据库报错');
            }
        }
    });
});

$('#goBack').on('click', function(){
   window.location.href = '../login/login.html';
});

