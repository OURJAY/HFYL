import '../../assets/scss/login/login.scss';

(function() {
	// var localhost = 'http://122.144.131.98';
	// var localhost = 'www.moread.com';

	$('.login-tab').click(function() {
		$('.login').css('display', 'block');
		$('.register').css('display', 'none');
	});
	$('.register-tab').click(function() {
		$('.login').css('display', 'none');
		$('.register').css('display', 'block');
	});

	// 用户登录
	$('#login').click(function() {
		let loginUrl = '/api/account/login';
		let loginData = {
			name: $('.login input[name="username"]').val(),
			password: $('.login input[name="password"]').val()
		};
		$.get(loginUrl, loginData, function(data) {
			// console.log(data);
			window.open('./home.html?token=' + data.token + '&userId=' + data.userModel.userId, '_self');
		});
	});
	//用户注册
	$("#register").click(function() {
		let registerUrl = ' /api/account/register';
		let rigisterData = {
			mobile: $('.register input[name="mobile"]').val(),
			name: $('.register input[name="username"]').val(),
			nickname: $('.register input[name="nickname"]').val(),
			password: $('.register input[name="password"]').val(),
		};
		$.get(registerUrl, registerData, function(data) {
			// console.log(data);
			window.open('./home.html?token=' + data.token + '&userId=' + data.userModel.userId, '_self');
		});
	});
})();