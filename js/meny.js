/*!
 * meny 0.5
 * http://lab.hakim.se/meny
 * MIT licensed
 *
 * Created by Hakim El Hattab, http://hakim.se
 */
(function(){
	var meny = document.getElementsByClassName('meny')[0];

	// Avoid throwing errors if the script runs on a page with 
	// no .meny
	if( !meny || !meny.parentNode ) {
      console.log('no meny found');
      return;
    }

	var menyWrapper = meny.parentNode;
	
	// Add a class to identify the parent of the meny parts
	menyWrapper.className += ' meny-wrapper';

	var //indentX = menyWrapper.offsetLeft,
		//activateX = 40,
		//deactivateX = meny.offsetWidth || 300,
		//touchStartX = null,
		//touchMoveX = null,
		isActive = false,
		isMouseDown = false;

	var supports3DTransforms = 'WebkitPerspective' in document.body.style ||
								'MozPerspective' in document.body.style ||
								'msPerspective' in document.body.style ||
								'OPerspective' in document.body.style ||
								'perspective' in document.body.style;

    /*
	document.addEventListener( 'touchstart', onTouchStart, false );
	document.addEventListener( 'touchend', onTouchEnd, false );
    */

	// Fall back to more basic CSS
	if( !supports3DTransforms ) {
		document.documentElement.className += ' meny-no-transform';
	}

	document.documentElement.className += ' meny-ready';

    /*
	function onTouchStart( event ) {
		touchStartX = event.touches[0].clientX - indentX;
		touchMoveX = null;

		if( isActive || touchStartX < activateX ) {
			document.addEventListener( 'touchmove', onTouchMove, false );
		}
	}
	function onTouchMove( event ) {
		touchMoveX = event.touches[0].clientX - indentX;

		if( isActive && touchMoveX < touchStartX - activateX ) {
			deactivate();
			event.preventDefault();
		}
		else if( touchStartX < activateX && touchMoveX > touchStartX + activateX ) {
			activate();
			event.preventDefault();
		}
	}
	function onTouchEnd( event ) {
		document.addEventListener( 'touchmove', onTouchMove, false );

		// If there was no movement this was a tap
		if( touchMoveX === null ) {
			// Hide the menu when tapping on the content area
			if( touchStartX > deactivateX ) {
				deactivate();
			}
			// Show the meny when tapping on the left edge
			else if( touchStartX < activateX * 2 ) {
				activate();
			}
		}
	}
    */

	activate = function() {
		if( isActive === false ) {
			isActive = true;
			addClass( document.documentElement, 'meny-active' );
		} else {
          deactivate()
        }
	}

	var deactivate = function() {
		if( isActive === true ) {
			isActive = false;
			removeClass( document.documentElement, 'meny-active' );
            //Yap.fire('meny-deactivated');
		}
	}

	function addClass( element, name ) {
		element.className = element.className.replace( /\s+$/gi, '' ) + ' ' + name;
	}

	function removeClass( element, name ) {
		element.className = element.className.replace( name, '' );
	}


    window.Meny = {
      deactivate: deactivate,
      activate: activate
    }

    var attach_event = function(el, ev, cb){
      if (el.addEventListener) {
          el.addEventListener(ev, cb, false);
      } else if (el.attachEvent)  {
          el.attachEvent(ev, cb);
      }
    }
    var meny_contents = document.getElementsByClassName('meny-contents')[0];
    attach_event(meny_contents, 'click', deactivate);
    attach_event(meny_contents, 'onTouchEnd', deactivate);

    /*
    Meny.activateArrow = function(){
      var meny_arrow = document.getElementsByClassName('meny-arrow')[0];
      attach_event(meny_arrow, 'click', activate, false);
      attach_event(meny_arrow, 'onTouchEnd', activate, false);
    }
    */
})();

