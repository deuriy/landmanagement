$.validator.addMethod(
	"regex",
	function(value, element, regexp) {
		var re = new RegExp(regexp);
		return this.optional(element) || re.test(value);
	},
	"Поле заполнено не верно"
);

class InteractiveForm {
	constructor(el, opts = {}) {
		this.$form = $(el);

		let $form = this.$form;

		if ($form.data("action")) {
			$form.prop("action", $form.data("action"));
		}

		let $phoneIntputs = $form.find('[name="phone"], [type="tel"]');

		$phoneIntputs.inputmask({
			mask: "+7 999 999-99-99",
			showMaskOnHover: false
		});

		$form.find('[name="captcha"]').inputmask({
			mask: "99999",
			showMaskOnHover: false
		});

		let validatorOpts = {
			rules: {
				captcha: {
					required: true,
					regex: /\d\d\d\d\d/
				},

				email: {
					email: true,
				},

				phone: {
					regex: /\+7\s\d\d\d\s\d\d\d\-\d\d\-\d\d/
				},

				message: {
					required: true,
				},

				agreement: {
					required: true,
				},
			},

			messages: {
				email: {
					required: "Обязательное поле",
					email: "Электронный адрес заполнен неверно"
				},

				message: {
					required: "Вы не написали сообщение",
					regex: "Поле заполнено неверно"
				},

				agreement: {
					required: "Вы не согласились с условиями",
				},
			},

			errorElement: "span",
			onfocusout: (el /*, event*/) => {
				$(el).valid();
			},

			focusCleanup: false,
			submitHandler: opts.submitHandler || this.standartFormHandler, //(form)=>{}
			errorPlacement: ($errorLabel, $el) => {
				if ($el.attr("name") === "agree") {
					console.log('Agree!');
					return true;
				} else {
					$errorLabel.addClass("Form_hint Form_hint-error");
					$el.after($errorLabel);
					return true;
				}
			},
			highlight: function(element) {
		    $(element).siblings('.FormLabel').addClass('FormLabel-error');
		    $(element).removeClass('valid').addClass('error');
			},
			unhighlight: function(element) {
		    $(element).siblings('.FormLabel').removeClass('FormLabel-error');
		    $(element).removeClass('error').addClass('valid');
			}
		};

		$phoneIntputs.each((index, el) => {
			validatorOpts.rules[el.name] = {
				required: !!el.required,
				regex: /\+7\s\d\d\d\s\d\d\d\-\d\d\-\d\d/
			};
		});

		if (opts.validatorParams) {
			$.extend(true, validatorOpts, opts.validatorParams);
		}

		if (opts.successBlockMod) {
			$.extend(true, opts, { successBlockMod: "default" });
		}

		this.opts = opts;
		this.validator = $form.validate(validatorOpts);
	}

	standartFormHandler(form) {
		let $form = $(form);

		window.pagePreloader.show();

		let dataToSend = $.extend(true, $form.serializeObject(), {
			Submit: 1,
			url: window.location.href
		});

		$.ajax({
			url: form.action,
			type: form.method,
			data: dataToSend
		})
			.done(response => {
				let errorCode = parseInt(response.code);
				if (errorCode === 0) {
					var button = '';

					if ($form.parents('.fancybox-slide').length > 0) {
						button = '<button type="button" data-fancybox-close class="BtnBlue Form_resultBtn">Ок, спасибо</button>';
					}

					let successText =
						`<div class="Form_result">` +
						`<div class="Form_resultIcon"><img src="/img/success.svg" alt="Success"></div>` +
						`<div class="Form_resultTitle">${response.title}</div>` +
						`<div class="Form_resultText">${response.success}</div>` + button +
						`</div>`;
					window.requestAnimationFrame(() => {
						$form.addClass('Form-success');
						if ($form.parents('.fancybox-slide').length > 0) {
							$form.addClass('Form-resultPopup');
						}
						$form.find('.Form_title, .Form_wrapper').hide();
						$form.find('.Form_wrapper').after(successText);
					});
				} else if (errorCode === 1) {
					let validator = $form.data("validator");
					$form
						.find('[name="captcha"]:first')
						.val("")
						.trigger("focus");

					validator.showErrors({
						captcha: response.error
					});
				} else {
					var button = '';

					if ($form.parents('.fancybox-slide').length > 0) {
						button = '<button type="button" data-fancybox-close class="BtnBlue Form_resultBtn">Понятно</button>';
					} else {
						button = '<button type="button" class="BtnBlue Form_resultBtn" onclick="location.reload();">Перезагрузить страницу</button>';
					}

					let errorText =
						`<div class="Form_result">` +
						`<div class="Form_resultIcon"><img src="/img/error.svg" alt="Error"></div>` +
						`<div class="Form_resultTitle">${response.title}</div>` +
						`<div class="Form_resultText">${response.error}</div>` + button +
						`</div>`;
					window.requestAnimationFrame(() => {
						$form.addClass('Form-error');
						if ($form.parents('.fancybox-slide').length > 0) {
							$form.addClass('Form-resultPopup');
						}
						$form.find('.Form_title, .Form_wrapper').hide();
						$form.find('.Form_wrapper').after(errorText);
					});
				}
			})
			.always((/*response*/) => {
				window.pagePreloader.hide();
			});
	}

	destroy() {
		this.validator.destroy();
		this.$form.find("input").inputmask("remove");
	}
}