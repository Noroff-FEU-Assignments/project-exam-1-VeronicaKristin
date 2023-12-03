document.addEventListener("DOMContentLoaded", async () => {
	let results;
	const productList = document.getElementById("all-posts");
	const postsToShowInitially = 10;
	let currentPostIndex = 0;

	const handleError = () => {
		const error = Object.assign(document.createElement("h3"), {
			innerText: "Unable to get post",
			style: "color: white",
		});
		productList.appendChild(error.cloneNode(true));
		productList.removeChild(productList.getElementsByClassName("lds-dual-ring")[0]);
	};

	try {
		const response = await fetch("https://www.fadnes.me/wp-json/wc/store/products/?per_page=13");
		results = await response.json();
	} catch (e) {
		handleError();
		return;
	}

	if (results.statusCode && results.statusCode !== 200) {
		handleError();
		return;
	}

	const displayPosts = () => {
		const postsToDisplay = results.slice(currentPostIndex, currentPostIndex + postsToShowInitially);

		for (const item of postsToDisplay) {
			const product = Object.assign(document.createElement("div"), {
				id: item.id,
				className: "post-item border",
			});

			product.appendChild(
				Object.assign(document.createElement("img"), {
					src: item.images[0].src,
					className: "all-posts_photos",
					alt: item.name,
				})
			);

			product.appendChild(
				Object.assign(document.createElement("h4"), {
					innerText: item.name,
					className: "post-title",
				})
			);

			product.appendChild(
				Object.assign(document.createElement("p"), {
					innerText: item.short_description,
					className: "post-description",
				})
			);

			product.appendChild(
				Object.assign(document.createElement("a"), {
					href: `/post-specific.html?id=${item.id}`,
					innerHTML: "<p>Read more</p>",
					style: "background: #212529",
					className: "button",
				})
			);

			productList.appendChild(product);
		}

		currentPostIndex += postsToShowInitially;

		if (currentPostIndex >= results.length) {
			loadMoreButton.style.display = "none";
		}
	};

	displayPosts();

	const loadMoreButton = Object.assign(document.createElement("button"), {
		innerText: "Load More",
		className: "load-more-button",
		style: "background: #212529; color: white; padding: 10px;",
		onclick: displayPosts,
	});

	productList.appendChild(loadMoreButton);

	productList.removeChild(productList.getElementsByClassName("lds-dual-ring")[0]);
});
