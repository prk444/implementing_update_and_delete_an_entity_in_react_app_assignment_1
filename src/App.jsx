import React, { useEffect, useState } from "react";
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [item, setItem] = useState(null);

  // Fetch the item from the server
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URI}/1`); // Fetch a specific door (e.g., door with ID 1)
        if (!response.ok) {
          throw new Error("Failed to fetch item");
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, []);

  // Handle the update logic
  const handleUpdate = async (updatedItem) => {
    try {
      const response = await fetch(`${API_URI}/${updatedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const data = await response.json();
      setItem(data); // Update the state with the updated item
      console.log("Item updated successfully:", data);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div>
      <h1>Update Item</h1>
      {item ? (
        <UpdateItem item={item} onUpdate={handleUpdate} />
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );
}

export default App;