window.DETOUR || (DETOUR = {});

(function($, window, document, undefined) {

	var _common = DETOUR.common = {
		init: function() {
			this.setVars();
			this.bindEvents();
		},

		setVars: function() {
		},

		bindEvents: function() {
			
			$('#directions').on('click', this.pullDirections);
		},

		pullDirections: function(){
			var $this = $('#directions');

			if ($this.is('.pulled')) {
				$this.removeClass('pulled');
				$this.animate({ scrollTop: 0 }, "slow");
			}
			else {
				$this.addClass('pulled');
			}
		}
	};

	DETOUR.common.init(); //lol. note to self: remember to initialize

})(jQuery, window, document);
