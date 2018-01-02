var expandableModule = (function( $ ){
	'use strict';

	function expand( array, length ) {

		// console.log( '>> expand()' );

		if ( length > 0 ) {

			for ( var i = 0; i < length; i++ ) {
				var env = '[data-environment="' + array[i] + '"]';
				$( env ).data( 'collapsed', false ).addClass('active');
			}

		}




		// Unbind the slide toggle click
		$( '.expandable__header' ).unbind( 'click' );

		// Each expandable class, initially set vars for header and content objects.
		$( '.expandable' ).each(function () {

			var $this = $( this ),
				$header = $this.find( '.expandable__header' ).eq(0),
				$content = $this.find( '.expandable__content' ).eq(0),
				isCollapsed = $this.data( 'collapsed' );

			function toggleContent() {
				$content.stop().slideToggle( 'fast' );
				$this.toggleClass( 'active' );
			}

			if ( isCollapsed ) {
				$content.hide();
			}

			// When the header is clicked toggle the content and change the active class
			$header.on( 'click', function ( e ) {
				e.preventDefault();

				// we need to check here if we are dealing with accordion content
				if ( $this.hasClass( 'accordion' ) ) {

					// we also need to check if the one we have clicked on is the one thats open already
					if ( $this.hasClass( 'active' ) ) {

						// if it is then lets just close this one
						toggleContent();

					// if its not already open then lets close all and then open the one we have clicked on
					} else {

						// first of all lets close all accordion infoboxes, not child accordion info boxes
						$( '.expandable.accordion > .expandable__content' ).css( 'display', 'none' );

						// then we need to adjust the styling (add/remove classes)
						$( '.expandable.accordion ').removeClass( 'active' );

						// then lets open the one we have clicked on
						toggleContent();

						// then lets scroll to the content
						$( 'html, body' ).animate({
						    scrollTop: ( $header.first().offset().top )
						},500);

					}

				// else lets just use the default behaviour
				} else {
					toggleContent();
				}
			});
		});

	}

	// Reads cookie - if it exists - and sets options. Falls back to defaults.
	function getOptions() {

		// Check that cookies are supported
		// Check to see if cookie already exists
		// If so, open selected panel


		var hasConfig = cookieModule.checkCookie( 'env-settings' ),
			cookieVal = '';

		// Check if cookie already exists
		if ( hasConfig ) {

			cookieVal = cookieModule.getCookieValue( 'env-settings' );

		// No cookie set
		} else {
			console.log( 'no cookie set' );
		}

	}

	// Sets current options to a cookie
	function setOptions( env ) {

		cookieModule.setCookie( 'env-settings', env, 90 );

	}



	return {
		expand: expand,
		getOptions: getOptions,
		setOptions: setOptions
	};

})( jQuery );