const reviewBtn = document.getElementById("reviewBtn");

const loading = document.getElementById("loading");

const result = document.getElementById("result");

const emptyState = document.getElementById("emptyState");

const historyList = document.getElementById("historyList");

const clearHistoryBtn =
    document.getElementById("clearHistory");


reviewBtn.addEventListener("click", async () => {

    const code =
        document.getElementById("code").value;

    const language =
        document.getElementById("language").value;


    if (!code.trim()) {

        alert("Please enter some code.");

        return;
    }


    loading.classList.remove("hidden");

    reviewBtn.disabled = true;


    try {

        const response = await fetch(
            "/api/review",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    code,
                    language
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to review code"
            );
        }


        displayReview(data.review);


        saveToHistory(
            language,
            code,
            data.review
        );


        loadHistory();


    } catch (error) {

        console.error(error);

        alert(error.message);

    } finally {

        loading.classList.add("hidden");

        reviewBtn.disabled = false;
    }

});


function displayReview(review) {

    const bugsList =
        document.getElementById("bugs");

    const suggestionsList =
        document.getElementById("suggestions");


    bugsList.innerHTML = "";

    suggestionsList.innerHTML = "";


    // BUGS

    if (!review.bugs || review.bugs.length === 0) {

        bugsList.innerHTML = `
            <div class="bug">
                <h4>No major bugs found</h4>
                <p>
                    The AI did not identify any major
                    issues in the submitted code.
                </p>
            </div>
        `;

    } else {

        review.bugs.forEach((bug) => {

            const bugDiv =
                document.createElement("div");


            bugDiv.className = "bug";


            bugDiv.innerHTML = `

                <h4>
                    ${escapeHTML(bug.title)}
                </h4>

                <p>
                    <strong>Severity:</strong>
                    ${escapeHTML(bug.severity)}
                </p>

                <p>
                    <strong>Explanation:</strong>
                    ${escapeHTML(bug.explanation)}
                </p>

                <p>
                    <strong>Recommendation:</strong>
                    ${escapeHTML(bug.recommendation)}
                </p>

            `;


            bugsList.appendChild(bugDiv);

        });

    }


    // SUGGESTIONS

    review.suggestions.forEach(
        (suggestion) => {

            const li =
                document.createElement("li");

            li.textContent = suggestion;

            suggestionsList.appendChild(li);

        }
    );


    // COMPLEXITY

    document.getElementById(
        "timeComplexity"
    ).textContent =
        review.timeComplexity;


    document.getElementById(
        "spaceComplexity"
    ).textContent =
        review.spaceComplexity;


    // SCORE

    document.getElementById(
        "score"
    ).textContent =
        review.score;


    // IMPROVED CODE

    document.getElementById(
        "improvedCode"
    ).textContent =
        review.improvedCode;


    emptyState.classList.add("hidden");

    result.classList.remove("hidden");

}


function saveToHistory(
    language,
    code,
    review
) {

    const history =
        JSON.parse(
            localStorage.getItem(
                "codeReviewHistory"
            )
        ) || [];


    const item = {

        id: Date.now(),

        language,

        code,

        score: review.score,

        date: new Date().toLocaleString()

    };


    history.unshift(item);


    // Keep only latest 5 reviews

    const limitedHistory =
        history.slice(0, 5);


    localStorage.setItem(
        "codeReviewHistory",
        JSON.stringify(limitedHistory)
    );

}


function loadHistory() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "codeReviewHistory"
            )
        ) || [];


    historyList.innerHTML = "";


    if (history.length === 0) {

        historyList.innerHTML = `
            <p class="history-empty">
                No previous reviews.
            </p>
        `;

        return;
    }


    history.forEach((item) => {

        const div =
            document.createElement("div");


        div.className =
            "history-item";


        div.innerHTML = `

            <div>

                <strong>
                    ${escapeHTML(item.language)}
                </strong>

                <span>
                    ${escapeHTML(item.date)}
                </span>

            </div>

            <strong>
                ${item.score}/10
            </strong>

        `;


        historyList.appendChild(div);

    });

}


clearHistoryBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "codeReviewHistory"
        );

        loadHistory();

    }
);


function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


// Load history when page opens

loadHistory();