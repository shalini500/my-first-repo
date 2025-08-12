import React from "react";

function Home() {
    return (
        <section className="home-section">
            <h1>Welcome to Accessibility Analyser</h1>
            <p>
                This tool helps you analyse your web content for accessibility issues including
                color contrast,
                ARIA attributes, and basic text analysis.
            </p>
            <p>
                Use the "Analyse Text" page to start checking your content now.
            </p>
        </section>
    );
}

export default Home;