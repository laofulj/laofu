/**
 * Created by dell on 2017/7/28.
 */
$('#login').on('click', function() {
    $.ajax({
        type: 'GET',
        url: ' http://datainfo.duapp.com/shopdata/userinfo.php',
        data: {
            "status": "login",
            userID: $('#userName').val(),
            password: $('#pass').val()
        },
        dataType: 'json',
        success: function(data) {
            if(data === 0) {
                alert('用户名不存在');
            }else if(data === 2) {
                alert('用户名密码不符');
            }else {
                if(localStorage.getItem('rememberPW') === 'true') {
                    localStorage.setItem('userID',$('#userName').val());
                    localStorage.setItem('password',$('#pass').val());
                }else {
                    sessionStorage.setItem('userID', $('#userName').val());
                    sessionStorage.setItem('password', $('#pass').val());
                }
                window.location.href = '../list/list.html';
            }
        }
    });
});

$('#register').on('click', function() {
    window.location.href = '../register/register.html';
});

/*显示密码*/
$('#showPW').on('change', function() {
    if($(this).attr('checked') === true) {
        $('#pass').attr('type','text');
    }else{
        $('#pass').attr('type','password');
    }
});

/*记住密码*/
$('#rememberPW').on('change', function(ev) {
    localStorage.setItem('rememberPW', ev.target.checked);
});

/*自动登录*/
if(localStorage.getItem('rememberPW') === 'true') {
    $('#userName').val(localStorage.getItem('userID'));
    $('#pass').val(localStorage.getItem('password'));
}else {
    $('#userName').val(sessionStorage.getItem('userID'));
    $('#pass').val(sessionStorage.getItem('password'));
}
