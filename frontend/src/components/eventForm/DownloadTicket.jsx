import axios from "axios";
import React, { useState } from "react";

const DownloadTicketButton = ({ registrationId }) => {
  const [loading, setLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null); // holds QR, student, event info
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Fetch PDF
      const response = await axios.get(
        `http://localhost:5173/api/registrations/ticket/${registrationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        }
      );

      // Download PDF
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `ticket_${registrationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Fetch ticket details (QR code + student + event) from backend
      const ticketResponse = await axios.get(
        `http://localhost:5173/api/registrations/ticket/details/${registrationId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTicketData(ticketResponse.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Ticket download failed:", error);
      alert("Error downloading ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
      setTicketData(null);
    }, 300);
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={loading || !registrationId}
        className={`px-9 py-4 text-xs rounded-lg transition-colors mt-6 ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
        aria-label="Download ticket PDF"
      >
        {loading ? "Downloading..." : "Download Ticket"}
      </button>

      {/* Ticket Details Modal */}
      {isModalOpen && ticketData && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
                      transition-opacity duration-300 ease-in-out ${
                        isClosing ? "opacity-0" : "opacity-100"
                      }`}
        >
          <div
            className={`bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center
                        transform transition-transform duration-300 ease-in-out ${
                          isClosing ? "scale-95" : "scale-100"
                        }`}
          >
            <h2 className="text-xl font-bold mb-4">Ticket Details</h2>

            {/* QR Code */}
            {ticketData.qrCode && (
              <img
                src={ticketData.qrCode}
                alt="Ticket QR"
                className="mb-4 w-48 h-48"
              />
            )}

            {/* Student Details */}
            {ticketData.student && (
              <div className="mb-4 w-full text-left">
                <h3 className="font-semibold text-lg mb-2">Student Details</h3>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {ticketData.student.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {ticketData.student.email}
                </p>
                <p>
                  <span className="font-medium">ID:</span>{" "}
                  {ticketData.student.id}
                </p>
              </div>
            )}

            {/* Event Details */}
            {ticketData.event && (
              <div className="mb-4 w-full text-left">
                <h3 className="font-semibold text-lg mb-2">Event Details</h3>
                <p>
                  <span className="font-medium">Title:</span>{" "}
                  {ticketData.event.title}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {ticketData.event.date}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {ticketData.event.location}
                </p>
                <p>
                  <span className="font-medium">Registration ID:</span>{" "}
                  {registrationId}
                </p>
              </div>
            )}

            <button
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadTicketButton;
