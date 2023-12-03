document.addEventListener("DOMContentLoaded", async () => {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	const postName = document.getElementById("post-title");
	const postDetails = document.getElementById("post-description");

	if (!id) {
		postName.innerHTML = "Post ID not provided";
		return;
	}

	let results;
	let response;
	try {
		response = await fetch(`https://www.fadnes.me/wp-json/wc/store/products/${id}`);
		results = await response.json();
	} catch (e) {
		postName.innerHTML = "Post does not exist";
		return;
	}

	if (response.status && response.status !== 200) {
		postName.innerHTML = "Post does not exist";
		return;
	}

	postName.innerHTML = results.name;

	const postImage = document.getElementById("post-image");
	postImage.src = results.images[0].src;
	postImage.alt = `${results.name} Post Image`;

	const gameText = document.getElementById("post-text");
	gameText.innerHTML = results.description;
	postDetails.className = "post-text-content";
});
