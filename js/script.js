document.addEventListener("DOMContentLoaded", async () => {
	let results;
	const productList = document.getElementById("all-posts");

	const handleError = () => {
		const error = Object.assign(document.createElement("h3"), { innerText: "Unable to get post", style: "color: white" });
		productList.appendChild(error.cloneNode(true));
		productList.removeChild(productList.getElementsByClassName("lds-dual-ring")[0]);
	};

	try {
		const response = await fetch("https://www.fadnes.me/wp-json/wc/store/products");
		results = await response.json();
	} catch (e) {
		handleError();
		return;
	}

	if (results.statusCode && results.statusCode !== 200) {
		handleError();
		return;
	}

	for (const item of results) {
		const product = Object.assign(document.createElement("div"), { id: item.id, className: "post-item border" });

		product.appendChild(Object.assign(document.createElement("img"), { src: item.images[0].src, className: "all-posts_photos", alt: item.name }));

		product.appendChild(
			Object.assign(document.createElement("a"), {
				href: `/post-specific.html?id=${item.id}`,
				innerHTML: "<p>read more</p>",
				style: "background: black",
			})
		);

		productList.appendChild(product);
	}

	productList.removeChild(productList.getElementsByClassName("lds-dual-ring")[0]);
});
