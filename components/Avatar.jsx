"use client";
import { useState } from "react";

export default function Avatar({ src, name, size = "w-10", text = "text-lg" }) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div className={`${size} aspect-square rounded-full overflow-hidden bg-base-300 flex items-center justify-center`}>
      {showImage ? (
        <img
          src={src}
          alt={name || "user"}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className={`${text} font-semibold text-base-content/60`}>
          {(name || "U").charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}