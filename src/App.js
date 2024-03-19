import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegistrationForm from "./RegistrationForm";
import ListingForm from "./ListingForm";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const [selection, setSelection] = useState("registration"); 
  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div>
          <h1>EZrest Administration Management System</h1>

          <form>
            <label>
              <input
                type="radio"
                value="registration"
                checked={selection === "registration"}
                onChange={handleSelectionChange}
              />
              Registration
            </label>
            <label>
              <input
                type="radio"
                value="listing"
                checked={selection === "listing"}
                onChange={handleSelectionChange}
              />
              Listing
            </label>
          </form>
          {selection === "registration" ? (
            <RegistrationForm />
          ) : (
            <ListingForm />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
