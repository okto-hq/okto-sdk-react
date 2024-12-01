import React, { useContext } from "react";
import { OktoContext } from "../OktoProvider";

const LoggedStatusButton: React.FC = () => {
  const context = useContext(OktoContext);

  if (!context) {
    return null;
  }

  const { isLoggedIn } = context;

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-sm">
      <div
        className={`w-3 h-3 rounded-full ${
          isLoggedIn ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
      <span className="text-sm font-medium">
        Status: {isLoggedIn ? "Logged In" : "Not Logged In"}
      </span>
    </div>
  );
};

export default LoggedStatusButton;
