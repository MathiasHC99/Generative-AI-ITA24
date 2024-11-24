document.addEventListener("DOMContentLoaded", () => {
    const destinationInput = document.querySelector("#Destination");
    const startDayInput = document.querySelector("#startDay");
    const endDayInput = document.querySelector("#endDay");
    const peopleInput = document.querySelector("#People");
    const interestsInput = document.querySelector("#interests");
    const generateButton = document.querySelector("#generateButton");
    const generatedText = document.querySelector("#generatedText");

    generateButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission

        // Collect user input
        const destination = destinationInput.value.trim();
        const startDay = startDayInput.value.trim();
        const endDay = endDayInput.value.trim();
        const people = peopleInput.value.trim();
        const interests = interestsInput.value.trim();

        if (!destination || !startDay || !endDay || !people || !interests) {
            generatedText.textContent = "Please fill in all fields before generating a plan.";
            return;
        }

        // loading message
        generatedText.textContent = "Generating your vacation plan";
        let dots = 0;

        // ... loading animation
        const interval = setInterval(() => {
            dots = (dots + 1) % 4;
            generatedText.textContent = `Generating your vacation plan${'.'.repeat(dots)}`;
        }, 500);

        // Fetch vacation plan
        fetchVacationPlan(destination, startDay, endDay, people, interests)
            .then(plan => {
                clearInterval(interval);
                generatedText.textContent = plan; // Display the fetched plan
            })
            .catch(error => {
                clearInterval(interval);
                console.error(error);
                generatedText.textContent = "Failed to generate a vacation plan. Please try again.";
            });
    });
});
