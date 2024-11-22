import React, { useEffect, useState } from "react";
import './UserCard.css'

const UserCard = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("UserData"));
    if (storedUser) {
      setUser(storedUser);
      setRole(storedUser.role || ""); // Default role if not set
    }
  }, []);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Update user role in localStorage
    const updatedUser = { ...user, role: selectedRole };
    setUser(updatedUser);
    localStorage.setItem("UserData", JSON.stringify(updatedUser));

    alert(`Role updated to ${selectedRole}`);
  };

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="user-card">
      <h2>User Details <img src={`${user.picture}`} width={50} height={50} alt="" /></h2>
      <div className="user-info">
        
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p>
          <strong>Role:</strong> {role ? role : "Not selected"}
        </p>
      </div>

      <div className="role-selection">
        <label htmlFor="role">
          Select Role:
        </label>
        <select
          id="role"
          value={role}
          onChange={handleRoleChange}
          className="role-dropdown"
        >
          <option value="">-- Choose Role --</option>
          <option value="Tenant Agent">Tenant Agent</option>
          <option value="Landlord">Landlord</option>
        </select>
      </div>
    </div>
  );
};

export default UserCard;
