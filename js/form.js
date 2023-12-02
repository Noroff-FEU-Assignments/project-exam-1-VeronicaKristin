function validateForm() {
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var subject = document.getElementById("subject").value;
	var message = document.getElementById("message").value;

	var nameError = document.getElementById("nameError");
	var emailError = document.getElementById("emailError");
	var subjectError = document.getElementById("subjectError");
	var messageError = document.getElementById("messageError");

	nameError.textContent = "";
	emailError.textContent = "";
	subjectError.textContent = "";
	messageError.textContent = "";

	var isValid = true;

	if (name === "") {
		nameError.textContent = "Name is required";
		isValid = false;
	} else if (name.length < 5) {
		nameError.textContent = "Name must be at least 5 characters";
		isValid = false;
	}

	if (email === "") {
		emailError.textContent = "Email is required";
		isValid = false;
	} else if (!isValidEmail(email)) {
		emailError.textContent = "Invalid email format";
		isValid = false;
	}

	if (subject === "") {
		subjectError.textContent = "Subject is required";
		isValid = false;
	} else if (subject.length <= 15) {
		subjectError.textContent = "Subject must be more than 15 characters";
		isValid = false;
	}

	if (message === "") {
		messageError.textContent = "Message is required";
		isValid = false;
	} else if (message.length <= 25) {
		messageError.textContent = "Message must be more than 25 characters";
		isValid = false;
	}

	return isValid;
}

function isValidEmail(email) {
	var emailRegex = /\S+@\S+\.\S+/;
	return emailRegex.test(email);
}
