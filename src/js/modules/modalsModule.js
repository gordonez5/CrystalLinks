var modalsModule = (function( $ ){

	'use strict';

	function settingsModal() {

		$( '[data-trigger="open-settings"]' ).magnificPopup({
			items: {
				src: '#settings-modal',
				type: 'inline',
			},
			preloader: false,
			callbacks: {
				close: function() {
					// cookieModule.setCookie( 'env-settings', 'Welcome message read', 14);
					// console.log( 'settings closed' );
				}
			}
		});

		return true;

	}

	return {
		settingsModal: settingsModal
	};


})( jQuery );