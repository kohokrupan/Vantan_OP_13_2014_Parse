$(document).ready(function(){
	Parse.initialize("YOUR KEY", "IS HERE");

	$('#login').click(function(){
		var username, password;
		username = $('#username').val();
		password = $('#password').val();

		Parse.User.logIn(username, password, {
			success: function(user){
				location.href = "user.html";
			},
			error: function(user, error){
				alert(error.message);
			}
		});

		return false;
	});

	$('#submit').click(function(e){
		var user = new Parse.User();
		user.set('username', $('#username').val());
		user.set('email', $('#email').val());
		user.set('password', $('#password').val());
		user.signUp(null, {
			success: function(user){
				Parse.User.logIn($('#username').val(), $('#password').val(), {
					success: function(user){
						location.href = "user.html";
					},
					error: function(user, error){
						alert(error.message);
					}
				});
			},
			error: function(user, error){
				alert(error.message);
			}
		});
		return false;
	});


	var currentUser = Parse.User.current();
	if (currentUser) {
		$('#username-area').html(currentUser.get('username'));

		var query = new Parse.Query(Parse.User);
		query.equalTo();
		query.find({
			success: function(results){
				for(var i = 0, l = results.length; i < l; i++){
					var list = document.createElement('li');
					list.innerHTML = results[i].get('username');
					$('#list').append(list);
				}
			},
			error: function(error){
				alert(error.message);
			}
		});
  }
});
