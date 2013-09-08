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
			$('.icon').on('click', this.clickMenu);
			$('.go').on('click', this.pressGo);
		},

		pullDirections: function(){
			var $this = $('#directions');

			if ($this.is('.pulled')) {
				$this.removeClass('pulled');
				$this.animate({ scrollTop: 0 }, "slow");
			}
			else {
				$this.addClass('pulled');
				$('.dir-arrow').innerHTML('hi');
			}
		},

		clickMenu: function(e){
			var $this = $('.menu');
			if ($('.icon').is('.clicked')) {
				$this.removeClass('clicked');
			}
			else {
				$this.addClass('clicked');
			}
		},

		pressGo: function() {
			$('.info').css('visibility','hidden');
			$('#directions').css('visibility','visible');
			$('.sub').children().addClass('open');

			}
	};

	DETOUR.common.init(); //lol. note to self: remember to initialize

})(jQuery, window, document);
