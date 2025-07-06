async function listup_all_objects() {
    const apiUrl = "https://cnbsc2kjbe.execute-api.ap-southeast-2.amazonaws.com/prod/lambda"; // Replace with your API Gateway endpoint
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

    const apiUrl = "https://cnbsc2kjbe.execute-api.ap-southeast-2.amazonaws.com/prod/lambda";
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