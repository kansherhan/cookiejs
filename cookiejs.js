class CookieJs {
	static get(name) {
		let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	static set(name, value, options = {}) {
		if (options.expires instanceof Date) {
			options.expires = options.expires.toUTCString();
		}

		let newCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

		for (let key in options) {
			newCookie += "; " + key;

			let valueOption = options[key];

			if (valueOption !== true) {
				newCookie += "=" + valueOption;
			}
		}

		document.cookie = newCookie;
	}

	static exists(name) {
		return (this.get(name) !== undefined);
	}

	static remove(name) {
		setCookie(name, "", {'max-age': -1});
	}
}