import React from 'react';
import Navigation from "@/components/Navigation";
import AppointmentBooking from "@/components/AppointmentBooking";

const BookAppointmentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <AppointmentBooking />
      </div>
    </div>
  );
};

export default BookAppointmentPage;