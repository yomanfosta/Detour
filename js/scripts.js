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
			$('.header').on('click', (function(){
				$('.info').css('visibility','visible');
				$('.info').css('z-index','1');
			}));
			$(document).on('click', this.headArrow)
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
			$('.info').css('z-index','0');
			$('#directions').css('visibility','visible');
			
			if ($('.go').is('.open')) {
				$this.removeClass('open');
				$('.sub').children().removeClass('open');
			}
			else {
				$this.addClass('open');
				$('.sub').children().addClass('open');
			}
		},

		headArrow: function() {
			if ($('.info').css('visibility') == 'hidden') {
				$('.head-arrow').css('visibility', 'visible');
				}
			else {
				$('.head-arrow').css('visibility', 'hidden');
			}
		}
	};

	DETOUR.common.init(); //lol. note to self: remember to initialize

})(jQuery, window, document);
