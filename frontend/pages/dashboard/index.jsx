import React, { useState } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MessageSquare, Home, Clock, BookOpen, Send, ChevronRight, X } from 'lucide-react';

// DatePicker Component
const DatePicker = ({ selectedDate, onDateChange }) => {
  const handleDateChange = (event) => {
    onDateChange(new Date(event.target.value));
  };

  return (
    <input
      type="date"
      value={selectedDate.toISOString().split('T')[0]}
      onChange={handleDateChange}
      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#6AC4D9]"
    />
  );
};

// Navbar Component
const Navbar = () => {
  return (
    <nav className="bg-[#204473] px-6 py-4 shadow-lg flex justify-between items-center">
      <div className="text-white text-2xl font-bold flex items-center">
        <div className="bg-[#6AC4D9] rounded-full p-1 mr-2">
          <User className="h-6 w-6 text-[#204473]" />
        </div>
        Dr. AJ's Clinic
      </div>
      <div className="flex items-center space-x-6">
        <Button variant="ghost" className="text-white hover:bg-[#3F618C] hidden md:flex">
          <Home className="mr-2 h-5 w-5" />
          Home
        </Button>
        <Button variant="ghost" className="text-white hover:bg-[#3F618C] hidden md:flex">
          <BookOpen className="mr-2 h-5 w-5" />
          Your Bookings
        </Button>
        <Avatar className="h-10 w-10 cursor-pointer bg-[#6AC4D9] text-[#204473]">
          <User className="h-6 w-6" />
        </Avatar>
      </div>
    </nav>
  );
};

// Modern Chatbot Component
const ModernChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Dr. Ajith's virtual assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "Thanks for your message. I'll help you book an appointment with Dr. Ajith. Would you prefer morning or afternoon?",
          sender: "bot"
        }]);
      }, 1000);
      setInput("");
    }
  };

  return (
    <>
      {/* Chat button (always visible) */}
      <div
        className="fixed bottom-6 right-6 bg-[#6AC4D9] text-white rounded-full p-4 shadow-lg cursor-pointer hover:bg-[#3F618C] transition-all z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </div>

      {/* Chat window */}
      <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 z-40 ${
        isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
      }`}>
        <div className="bg-[#204473] text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2 bg-[#6AC4D9]">
              <User className="h-5 w-5 text-[#204473]" />
            </Avatar>
            <div>
              <div className="font-bold">Dr. Ajith's Assistant</div>
              <div className="text-xs opacity-75">Online now</div>
            </div>
          </div>
          <X className="h-5 w-5 cursor-pointer hover:opacity-75" onClick={() => setIsOpen(false)} />
        </div>

        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-2xl max-w-xs ${
                msg.sender === "user"
                  ? "bg-[#6AC4D9] text-white rounded-br-none"
                  : "bg-[#F2F2F2] text-gray-800 rounded-bl-none shadow-sm"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-3 border-t border-gray-200 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6AC4D9] bg-gray-50"
            placeholder="Type your message..."
          />
          <Button
            onClick={handleSend}
            className="ml-2 bg-[#204473] hover:bg-[#3F618C] text-white rounded-full p-2 h-10 w-10"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

// Time Slot Component
const TimeSlot = ({ time, available }) => {
  return (
    <Button
      className={`rounded-full px-4 py-2 w-full ${
        available
          ? "bg-white text-[#204473] border border-[#6AC4D9] hover:bg-[#6AC4D9] hover:text-white"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
      disabled={!available}
    >
      {time}
    </Button>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const doctorInfo = {
    name: "Dr. Ajith",
    specialization: "General Physician",
    experience: "15+ years",
    availability: "Mon-Fri",
    photo: "dr.jpg" // Placeholder image URL
  };

  const timeSlots = [
    { time: "09:00 AM", available: true },
    { time: "10:00 AM", available: false },
    { time: "11:00 AM", available: true },
    { time: "12:00 PM", available: false },
    { time: "02:00 PM", available: true },
    { time: "03:00 PM", available: true },
    { time: "04:00 PM", available: false },
    { time: "05:00 PM", available: true }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Card className="bg-gradient-to-r from-[#204473] to-[#3F618C] text-white mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <CardContent className="flex-1 p-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to Dr. AJ's Clinic</h1>
              <p className="mb-6 opacity-90">Your health is our priority. Book an appointment with Dr. Ajith today.</p>
              <Button className="bg-[#6AC4D9] hover:bg-white hover:text-[#204473] text-white">
                Book Appointment
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
            {/* <div className="md:w-1/3 bg-[#6AC4D9] p-8 flex items-center justify-center">
              <img src="/api/placeholder/200/200" alt="Doctor" className="rounded-full border-4 border-white" />
            </div> */}
          </div>
        </Card>

        {/* Doctor Profile and Booking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doctor Profile */}
          <Card className="bg-white shadow-md hover:shadow-xl transition-shadow">
            <CardHeader className="pb-0">
              <CardTitle className="text-[#204473]">Meet Your Doctor</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <img src={doctorInfo.photo} alt={doctorInfo.name} />
                </Avatar>
                <h3 className="text-xl font-bold text-[#204473]">{doctorInfo.name}</h3>
                <Badge className="bg-[#6AC4D9] mt-2">{doctorInfo.specialization}</Badge>
                <div className="mt-4 text-center">
                  <div className="mb-2"><span className="font-semibold">Experience:</span> {doctorInfo.experience}</div>
                  <div><span className="font-semibold">Available:</span> {doctorInfo.availability}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Picker */}
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-0">
              <CardTitle className="text-[#204473] flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Select Date
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <DatePicker selectedDate={date} onDateChange={setDate} />
            </CardContent>
          </Card>

          {/* Time Slots */}
          <Card className="bg-white shadow-md">
            <CardHeader className="pb-0">
              <CardTitle className="text-[#204473] flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Available Slots
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-sm mb-4">
                {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot, index) => (
                  <TimeSlot key={index} time={slot.time} available={slot.available} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modern Floating Chatbot */}
      <ModernChatbot />
    </div>
  );
};

export default Dashboard;
