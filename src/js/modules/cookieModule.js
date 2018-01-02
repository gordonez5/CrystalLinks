var cookieModule = (function( $ ){
	'use strict';

	function supportsCookies() {

		var cookieEnabled = navigator.cookieEnabled;

		// When cookieEnabled flag is present and false then cookies are disabled.
		// Thanks to IE we can't trust the value "true".
		if ( cookieEnabled === false ) {
			return false;
		}

		// Internet Explorer is lying to us. So we have to set a test cookie
		// in this browser (We also do it for strange browsers not supporting
		// the cookieEnabled flag). But we only do this when no cookies are
		// already set (because that would mean cookies are enabled)
		if ( !document.cookie && ( cookieEnabled === null || /*@cc_on!@*/false ) ) {

			// Try to set a test cookie. If not set then cookies are disabled
			document.cookie = 'testcookie=1';
			if ( !document.cookie ) {
				return false;
			}

			// Remove test cookie
			document.cookie = 'testcookie=; expires=' + new Date(0).toUTCString();
		}

		// Well, at least we couldn't find out if cookies are disabled, so we
		// assume they are enabled
		return true;
	}


	// Returns the value of a named cookie.
	function getCookieValue( cname ) {

		if ( document.cookie.length > 0 ) {
			var name = cname + '=',
				ca = document.cookie.split( ';' );

			for ( var i=0; i<ca.length; i++ ) {
				var c = ca[i];
				while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1 );
				if ( c.indexOf( name ) === 0 ) {
					return c.substring( name.length,c.length );
				}
			}
		}
		return '';
	}

	// Enter cookie name (as string) to test if it exists.
	function checkCookie( cname ) {

		var cookieName = this.getCookieValue(cname);

		if ( cookieName !== '' ) {
			return true;
		} else {
			return false;
		}
	}

	// Set (or reset) a cookie
	function setCookie( cname, cvalue, exdays ) {

		var supportsCookies = this.supportsCookies();
		if ( supportsCookies === true ) {
			if ( exdays !== undefined ) {
				var d = new Date();
				d.setTime( d.getTime() + ( exdays*24*60*60*1000 ) );
				var expires = 'expires='+d.toUTCString();
				document.cookie = cname + '=' + cvalue + '; ' + expires + '; path=/';
				return true;
			} else {
				document.cookie = cname + '=' + cvalue + '; path=/';
				return true;
			}
		}
	}

	// Breaks down the page URI into it's constituent parts
	function parseURI() {

		var pageURI = window.location,
			href = pageURI.href || null,
			protocol = pageURI.protocol || null,
			hostname = pageURI.hostname || null,
			port = pageURI.port || null,
			pathname = pageURI.pathname || null,
			search = pageURI.search || null,
			hash = pageURI.hash || null,
			finalHash = null,
			finalSearch = null;

		// Check for hash
		if ( hash !== null ) {

			// ok, we have a hash but we need to sanitise it in case a query string was appended to the end
			var hashParts = hash.split( '?' );
			if ( hashParts.length > 1 ) {

				// Let's assume (for now) that the hash comprises the real hash plus a query string.
				// So now we split out the hash into it's parts
				finalHash = hashParts[0].substring( 1 );
				finalSearch = hashParts[1];
			} else {

				// Only one part to the hash, so we'll save this after stripping off the hash mark.
				finalHash = hash.substring( 1 );
				finalSearch = search;
			}

		// hash is null
		} else {

			// Remove question mark if query string is set
			if ( search !== null ) {
				finalSearch = search.substring( 1 );
			} else{
				finalSearch = search;
			}
		}

		var uriObj = {
			href: href,
			protocol: protocol,
			hostname: hostname,
			port: port,
			pathname: pathname,
			search: finalSearch,
			hash: finalHash
		};
		return uriObj;

	}

	// simply checks for query string and returns boolean
	function hasQueryString() {

		var url = this.parseURI();

		if ( url.search !== null ) {
			return true;
		} else {
			return false;
		}
	}



	return {
		supportsCookies: supportsCookies,
		getCookieValue: getCookieValue,
		checkCookie: checkCookie,
		setCookie: setCookie,
		parseURI: parseURI,
		hasQueryString: hasQueryString
	};

})( jQuery );