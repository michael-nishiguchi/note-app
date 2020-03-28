function logout() {
	$.post('/logout', function(result) {
		if (result && result.success) {
			$('#status').text('Successfully logged out.');
		}
		else {
			$('#status').text('Error logging out.');
		}
	});
}
