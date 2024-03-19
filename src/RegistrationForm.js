import React, { useState, useEffect } from "react";
import "./RegistrationForm.css"

const RegistrationForm = () => {
  const [registrations, setRegistrations] = useState([]);
  const [comments, setComments] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/registrations")
      .then((response) => response.json())
      .then((data) => {
        setRegistrations(data.filter(reg => reg.status === "pending"));
        const initialComments = data.reduce(
          (acc, registration) => ({
            ...acc,
            [registration.id]: registration.comment || "",
          }),
          {}
        );
        setComments(initialComments);
      })
      .catch((error) => console.error("Error fetching registration data:", error));
  }, []);

  const updateStatusAndMoveNext = (id, newStatus) => {
    const updatedRegistrations = registrations.map((registration) => {
      if (registration.id === id) {
        return { ...registration, status: newStatus };
      }
      return registration;
    });
    setRegistrations(updatedRegistrations.filter(reg => reg.status === "pending"));
    setCurrentIndex(0);
  };

  const handleCommentChange = (id, newComment) => {
    setComments({
      ...comments,
      [id]: newComment,
    });
  };

  const getButtonStyle = (currentStatus, buttonStatus) => {
    switch (currentStatus) {
      case "approve": return buttonStatus === "approve" ? { backgroundColor: "green", color: "white" } : {};
      case "decline": return buttonStatus === "decline" ? { backgroundColor: "red", color: "white" } : {};
      case "pending": return buttonStatus === "pending" ? { backgroundColor: "gray", color: "white" } : {};
      default: return {};
    }
  };

  return (
    <div>
      <h2>Registrations</h2>
      {registrations.length > 0 ? (
        <>
          {registrations.length > currentIndex ? (
            <div
              className={"content-section"}
              key={registrations[currentIndex].id}
              style={{
                marginBottom: "20px",
                paddingBottom: "10px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <strong>Name: </strong>
              <p>{registrations[currentIndex].name}</p>
              <strong>Email: </strong>
              <p>{registrations[currentIndex].email}</p>
              <strong>Type: </strong>
              <p>{registrations[currentIndex].type}</p>
              <strong>Status: </strong>
              <p>{registrations[currentIndex].status}</p>
              <strong>Identification:</strong>

              <br />
              <img
                src={registrations[currentIndex].identification}
                alt="Identification"
              />
              <textarea
                value={comments[registrations[currentIndex].id] || ""}
                onChange={(e) =>
                  handleCommentChange(registrations[currentIndex].id, e.target.value)
                }
                placeholder="Add a comment"
                style={{ width: "100%", marginBottom: "10px" }}
              />
              <button
                style={getButtonStyle(registrations[currentIndex].status, "approve")}
                onClick={() => updateStatusAndMoveNext(registrations[currentIndex].id, "approve")}
              >
                Approve
              </button>
              <button
                style={getButtonStyle(registrations[currentIndex].status, "decline")}
                onClick={() => updateStatusAndMoveNext(registrations[currentIndex].id, "decline")}
              >
                Decline
              </button>
              <button
                style={getButtonStyle(registrations[currentIndex].status, "pending")}
                onClick={() => updateStatusAndMoveNext(registrations[currentIndex].id, "pending")}
              >
                Set to Pending
              </button>
            </div>
          ) : (
            <p>No more pending registrations.</p>
          )}
        </>
      ) : (
        <p>No registrations found.</p>
      )}
    </div>
  );
};

export default RegistrationForm;
