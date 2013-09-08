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
			$('.header').on('click', (function(){($('.info').css('visibility','visible'))}));
		},

		pullDirections: function(){
			var $this = $('#directions');

			if ($this.is('.pulled')) {
				$this.removeClass('pulled');
				$this.animate({ scrollTop: 0 }, "slow");
				$('.dir-arrow').text('▲');
			}
			else {
				$this.addClass('pulled');
				$('.dir-arrow').text('▼');
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
			var $this = $('.go');
			$('.info').css('visibility','hidden');
			$('#directions, .head-arrow').css('visibility','visible');
			
			if ($('.go').is('.open')) {
				$this.removeClass('open');
				$('.sub').children().removeClass('open');
			}
			else {
				$this.addClass('open');
				$('.sub').children().addClass('open');
			}
		}
	};

	DETOUR.common.init(); //lol. note to self: remember to initialize

})(jQuery, window, document);
