class Preloader {
	constructor(selector) {
		let $el = $(selector);

		if (!$el.length) {
			console.error("Preloader class constructor cant't find target element!");
			return;
		}

		$el.get(0).onclick = (event) => {
			event.preventDefault();
			event.stopPropagation();
			return false;
		};

		this.$el = $el;
		this.isLocked = false;
	}

	show(cb) {
		if (this.isLocked) return false;
		this.$el.fadeIn(cb);
	}

	hide(cb) {
		if (this.isLocked) return false;
		this.$el.fadeOut(cb);
	}
}