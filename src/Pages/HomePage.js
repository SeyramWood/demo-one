import React from "react";

const HomePage = () => {
  return (
    <div className="home">
      <div className="cta">
        <h1>Daily Planner</h1>
        <p>A goal without a plan is just...a wish, plan your day ahead!</p>
      </div>
      <a href="/tasks">Get Started</a>
    </div>
  );
};

export default HomePage;
