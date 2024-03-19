import React, { useState, useEffect } from "react";

const ListingForm = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/listings")
      .then((response) => response.json())
      .then((data) => setListings(data))
      .catch((error) => console.error("Error fetching listing data:", error));
  }, []);

  return (
    <div>
      <h2>Listings</h2>
      {listings.length > 0 ? (
        <ul>
          {listings.map((listing) => (
            <li key={listing.id}>
              Title: {listing.title}, Address: {listing.address}, Owner:{" "}
              {listing.owner}
            </li>
          ))}
        </ul>
      ) : (
        <p>No listings found.</p>
      )}
    </div>
  );
};

export default ListingForm;
