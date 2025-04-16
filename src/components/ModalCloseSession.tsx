import { useState } from "react";
import { useUserActions } from "../hooks/useUserActions";
import "../styles/ModalCloseSession.css";

export default function ModalCloseSession() {
  const { removeUser } = useUserActions();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogout = async (e:React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:1234/verification/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout successful, removing user...");
        await removeUser();
        closeModal();
      } else {
        setError(`Logout failed: ${response.statusText}`);
        console.error("Error during logout:", response.statusText);
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Network error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button onClick={openModal} className="logout-button">
        Logout
      </button>

      {isOpen && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <div className="modal-content">
              <h2>Logout Confirmation</h2>
              <p>Are you sure you want to log out?</p>
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="modal-actions">
                <button 
                  onClick={handleLogout} 
                  className="logout-confirm-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging out..." : "Yes, Log out"}
                </button>
                <button 
                  onClick={closeModal} 
                  className="cancel-button"
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}