var settingsModule = (function( $ ){

	'use strict';

	var $checkboxes = $( '#settings-modal' ).find( '.panels' );


	// Events
	$checkboxes.on( 'change', '.checks__input', function( event ) {

		// console.log( event.target.id + ' clicked' );
		getChecks();
	});

	// gets the value of the currently selected checkboxes and saves checked values to array
	function getChecks() {

		// console.log( '>> getChecks()' );

		var checks = $checkboxes.find( 'input:checked' );
		var panelArray = [];
		var checksLength = checks.length;

		if ( checksLength === 0 ) {

			_saveSettings( panelArray );

		} else {

			for ( var i = 0; i < checksLength; i ++ ) {
				panelArray.push( checks[i].value.toString() );
			}

			_saveSettings( panelArray );

		}

	}

	// sets the checkboxes, based on the cookie value
	function setChecks( array, length ) {

		// console.log( '>> setChecks( [' + array + '], ' + length + ')' );

		for ( var i = 0; i < length; i++ ) {
			var id = '#' + array[i] + '-chk';
			$( id ).prop( 'checked', true );
		}

	}

	function _saveSettings( array ) {

		// console.log( '>> _saveSettings( [' + array + '] )' );

		cookieModule.setCookie( 'env-settings', array, 90 );

	}

	// retrieves settings from cookie value (if it exists)
	function getSettings() {

		// console.log( '>> getSettings()' );

		var cookieExists = cookieModule.checkCookie( 'env-settings' );

		if ( cookieExists === true ) {

			var checks = cookieModule.getCookieValue( 'env-settings' );
			var checksArray = checks.split(',');
			var checksLength = checksArray.length;

			setChecks( checksArray, checksLength );
			expandableModule.expand( checksArray, checksLength );

		} else {

			expandableModule.expand();
			return false;

		}

	}


	return {
		getChecks: getChecks,
		getSettings: getSettings,
		setChecks: setChecks
	};


})( jQuery );