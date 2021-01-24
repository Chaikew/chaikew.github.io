$('.linkToBot').on( 'click', function(event) {
	var win = window.open('https://discord.com/api/oauth2/authorize?client_id=765627731995000872&permissions=8&scope=bot%20applications.commands', '_blank');
	if (win) {
		win.focus();
	} else {
		alert('Please allow popups for this website');
	}
});