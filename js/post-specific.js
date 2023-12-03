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

	const postText = document.getElementById("post-text");
	postText.innerHTML = results.description;
	postDetails.className = "post-text-content";

	var modal = document.getElementById("myModal");
	var img = document.getElementById("post-image");
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("caption");

	img.onclick = function () {
		modal.style.display = "block";
		modalImg.src = this.src;
		captionText.innerHTML = this.alt;
	};

	var span = document.getElementsByClassName("close")[0];
	span.onclick = function () {
		modal.style.display = "none";
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
	productList.removeChild(productList.getElementsByClassName("lds-dual-ring")[0]);
});
