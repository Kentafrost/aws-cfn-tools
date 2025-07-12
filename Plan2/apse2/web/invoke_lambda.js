// replace with your API Gateway endpoint
const apiUrl = "https://cnbsc2kjbe.execute-api.ap-southeast-2.amazonaws.com/prod/lambda";

// list up all objects in S3 bucket
async function listup_all_objects() {

    document.getElementById('result').textContent = "Invoking...";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "listup_all_objects",
            })
        });
        const data = await response.json();
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    
    } catch (error) {
        document.getElementById('result').textContent = "Error: " + error;
    }
}

// Python案 いったん没
function SendQuestionaire(name, email, phone, question) {
    if (!name || !email || !phone || !question) {
        document.getElementById('result').textContent = "Please fill in all fields.";
        return;
    }

    document.getElementById('display').innerHTML = `
        <strong>Name:</strong> ${name}<br> 
        <strong>Email:</strong> ${email}<br> 
        <strong>Phone:</strong> ${phone}<br> 
        <strong>Question:</strong> ${question}<br>
        <strong>Timestamp:</strong> ${new Date().toISOString()}
    `;

    document.getElementById('result').textContent = "Invoking...";

    // Define and immediately invoke an async function
    (async () => {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "send_questionaire", // Specify the action
                    name,
                    email,
                    phone,
                    question
                })
            });

            const data = await response.json();
            document.getElementById('result').textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            document.getElementById('result').textContent = "Error: " + error;
        }
    })();
}

// JavaScript function to send questionnaire data to the Lambda function
function SendQuestionaire_php() {
    // send data to Lambda function
    document.getElementById('result').textContent = "Invoking...";
    
    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            question: document.getElementById('question').value
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        document.getElementById('result').textContent = "Error: " + error;
    });
}