const API_KEY = prompt("Enter your API token here");

function logSuggestion() {
    fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "user",
                    content: "Plan a vacation with the following details: Destination, start date, end date, number of travelers, interests"
                        + "come with a full description for what you can do each day"
                        + "Dont ask the user what you should add to the plan, they have already given you all the necessary details"
                        + "the output should come as a json string"


                }
            ],
            max_tokens: 500,
            stream: false
        })
    })
        .then(response => {
            if (!response.ok) {
                console.log(111);
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(suggestionData => {
            console.log(suggestionData);
        })
        .catch(error => console.error(error));
}

logSuggestion();