( function() {
	$.fx.speeds._default = 200;
	var clickedCount,
		targetCount,
		nextTargetTimeout,
		symbols = '☺☻✌☹♡♥❤⚘❀❃❁✼☀✌♫♪☃❄❅❆☕☂★',
		timeToClick = 2000,
		initialTimeBetweenTargets = 2000,
		speedIncreaseFactor = .05,
		timeouts = {};
	$('.play').click( function() {
		$('.intro, .game-over').fadeOut();
		clickedCount = 0;
		targetCount = 0;
		$('.score').text(0);
		$('.target').remove();
		setTimeout(addTarget, 999);
	});
	function addTarget() {
		var id = "t" + targetCount,
			text = symbols.charAt(Math.floor(Math.random() * symbols.length)),
			hue = Math.random() * 360,
			windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			size = Math.round( ( windowWidth + windowHeight ) * .02 ),
			$target = $('<button id="' + id + '" class="target">' + text + '</button>');
		$target
			.css({
				background: 'hsl(' + hue + ', 100%, 50%)',
				display: 'none',
				fontSize: size * .6,
				width: size,
				height: size,
				left: Math.random() * (windowWidth - size),
				top: Math.random() * (windowHeight - size)
			})
			.click( function() {
				clearTimeout(timeouts[this.id]);
				$('.score').text(++clickedCount);
				$(this)
					.off('click')
					.removeClass('blink')
					.addClass('popout');
				return false;
			})
			.appendTo('body')
			.fadeIn();
		timeouts[id] = setTimeout(gameOver, timeToClick);
		setTimeout( function() {
			$target.addClass('blink');
		}, timeToClick * .5);
		nextTargetTimeout = setTimeout(addTarget, initialTimeBetweenTargets / (1 + targetCount++ * speedIncreaseFactor));
	}
	function gameOver() {
		$('.target')
			.off('click')
			.addClass('disabled')
		$('.play').hide();
		$('.game-over').fadeIn();
		clearAllTimeouts();
		setTimeout( function() {
			$('.play').slideDown();
		}, 3000 );
	}
	function clearAllTimeouts() {
		clearTimeout(nextTargetTimeout);
		for ( var index in timeouts ) {
			clearTimeout(timeouts[index]);
		}
	}
})(jQuery);
