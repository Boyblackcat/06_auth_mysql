"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState({ fullname: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/me");
        if (response.ok) {
          const data = await response.json();
          // ปรับแก้ตรงนี้: เผื่อกรณี API ส่งข้อมูลมาเป็น data ตรงๆ หรือ data.user
          setUser(data.user || data); 
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="auth-box">
      <h1>Dashboard</h1>
      {/* เพิ่มเครื่องหมาย ? เพื่อป้องกัน error ตอนที่ user ยังไม่มีค่า */}
      <p>Welcome, {user?.fullname || "Loading..."}</p>
      <p>Email: {user?.email || "Loading..."}</p>
      
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}