import React from "react";
import { Link } from "react-router-dom";
import styles from "../componentsCSS/LandingPage.module.CSS"
 

export function LandingPage() {
  return (
    <div>
      <div>
        <h1>Welcome to All You Can Play</h1>
      </div>
      <div className = {styles.background}>
        <Link to="/home">
          <button>Press Start</button>
        </Link>
      </div>

      <p>
        This Individual Project was created by Erio Donalicio for Henry Full
        Stack Developer Academy, hope you like it.
      </p>
    </div>
  );
}
