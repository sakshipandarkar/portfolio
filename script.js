document.getElementById("feedbackForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let successMessage = document.getElementById("successMessage");

    // Basic Validation
    if (name === "") {
        alert("Name cannot be empty!");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email!");
        return;
    }

    // Store in LocalStorage
    let feedback = {
        name: name,
        email: email,
        message: message
    };

    let feedbackArray = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbackArray.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbackArray));

    successMessage.textContent = "Feedback Submitted Successfully ✅";

    document.getElementById("feedbackForm").reset();

    displayFeedback();
});

function displayFeedback() {
    let feedbackList = document.getElementById("feedbackList");
    let feedbackArray = JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbackList.innerHTML = "<h3>Submitted Feedback</h3>";

    feedbackArray.forEach(function(item) {
        let div = document.createElement("div");
        div.innerHTML = "<p><strong>Name:</strong> " + item.name + 
                        "<br><strong>Email:</strong> " + item.email + 
                        "<br><strong>Message:</strong> " + item.message + "</p><hr>";
        feedbackList.appendChild(div);
    });
}

// Load stored feedback on page load
displayFeedback();