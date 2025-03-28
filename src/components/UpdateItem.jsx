import React, { useState } from "react";

const UpdateItem = ({ item, onUpdate }) => {
    // 1. Create a state for the form
    const [formData, setFormData] = useState({
        name: item.name || "",
        description: item.description || "",
    });

    // 2. Create a function to handle the form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 3. Create a function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onUpdate) {
            onUpdate({ ...item, ...formData });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateItem;