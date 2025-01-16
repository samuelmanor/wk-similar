import React from "react";
import { FC } from "react";
import { useAppSelector } from "../hooks";

interface MistakesProps {}

/**
 * Displays a list of the user's mistakes
 */
export const Mistakes: FC<MistakesProps> = () => {
  const mistakes = useAppSelector((state) => state.user.mistakes);

  return (
    <div className="indicator">
      {/* <span className="indicator-item badge" style={{ zIndex: "11" }}>
        {mistakes.length}
      </span> */}
      <div className="drawer z-10">
        <input id="mistakes-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="mistakes-drawer" className="btn drawer-button w-fit">
            mistakes
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="mistakes-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {mistakes.length > 0 ? (
              <div>
                <p>recent mistakes:</p>
                <p onClick={() => console.log(mistakes)}>log</p>
                {mistakes.map((mistake, i) => (
                  <div key={i}>
                    {/* <a href={mistake.url} target="_blank" rel="noreferrer"> */}
                    <p>{mistake.character}</p>
                    <p>{mistake.meanings[0]}</p>
                    {/* </a> */}
                  </div>
                ))}
              </div>
            ) : (
              <p>no recent mistakes</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
