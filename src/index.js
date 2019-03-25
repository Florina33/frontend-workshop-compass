let compass = {
	pole: 'NE',
	text: '324',
	symbol: '&deg;',
	derectionCompassBody: $('.compass .body'),
	derectionDegreesPole: $('.compass .pole'),
	derectionDegreesText: $('.compass .degrees'),


	updateDirectionText (value) {
		this.derectionDegreesText.text( value.toFixed(0) );
		// this.derectionDegreesText.text(Math.trunc(value));
	},
	updateDirectionPole (value) {
		// this.derectionDegreesPole.textMath.trunc(value);
		let styles = {
			// transform: `rotateX( ${value} deg)`
			transform: "rotateZ( " + value + "deg)",
			backgroundColor : ""
		};
		// this.derectionCompassBody.css(styles);

		this.derectionCompassBody.css( {'transform' : 'rotateZ(' + value + 'deg)'} );
	}

};

// handleOrentation
function subscribeToCompassEvent (callback) {
	window.addEventListener('deviceorientation', handleOrientation);

	function handleOrientation (event) {
		let alpha;

		if (event.hasOwnProperty('webkitCompassHeading')) {
			// get absolute orientation for Safari/iOS
			alpha = 360 - event.webkitCompassHeading; // conversion taken from a comment on Google Documentation, not tested
		}
		else {
			alpha = event.alpha;
		}

		callback(alpha);
	}
}

subscribeToCompassEvent(function (alpha) {
	console.log(`${alpha.toFixed(2)} degrees`);

	compass.updateDirectionText(alpha);
	compass.updateDirectionPole(alpha);
});
