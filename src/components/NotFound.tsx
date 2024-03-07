import { useRouter } from "next/router";
import React from "react";

function NotFound() {
  const router = useRouter();
  return (
    <div
      style={{
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        height: "100vh",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{display:"flex", alignItems: "center"}}>
        <h1
          className="next-error-h1"
          style={{
            display: "inline-block",
            margin: "0px 20px 0px 0px",
            padding: "0px 23px 0px 0px",
            fontSize: 24,
            fontWeight: 500,
            verticalAlign: "top",
          }}
        >
          404
        </h1>
        <div style={{ display: "inline-block" }}>
          <h2 style={{ fontSize: 14, fontWeight: 400, margin: 0 }}>
            This page could not be found.
          </h2>
        </div>
      </div>
      <button className="text-white bg-blue-500 border rounded px-3 py-1" onClick={() => router.back()}>Back</button>
    </div>
  );
}

export default NotFound;
