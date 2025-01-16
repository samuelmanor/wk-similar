import React from "react";
import { FC } from "react";
import { useAppSelector } from "../hooks";

interface WarningProps {}

/**
 * Displays an error/warning message
 */
export const Warning: FC<WarningProps> = () => {
  const message = useAppSelector((state) => state.question.error);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-background font-body text-text">
      <p className="">{message}</p>
    </div>
  );
};
