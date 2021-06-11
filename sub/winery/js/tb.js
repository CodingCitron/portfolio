$(document).ready(function(e){
	$('#slideDown').find('i').click(function(e){
		$(this).toggleClass('fas fa-chevron-down').toggleClass('fas fa-chevron-up');
		$('.at02-txt-slide').slideToggle();
		
	});
});