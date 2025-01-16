import React from "react";
import { FC } from "react";
import { useAppSelector } from "../hooks";
import { LuMenu } from "react-icons/lu";

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
            <LuMenu className="icon" size="32px" />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="mistakes-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="menu min-h-full w-80 p-4 bg-background text-text font-body">
            {/* Sidebar content here */}
            {mistakes.length > 0 ? (
              <div>
                <p className="text-2xl">recent mistakes:</p>
                {/* <p onClick={() => console.log(mistakes)}>log</p> */}
                <div className="flex flex-col gap-3 overflow-scroll max-h-80">
                  {mistakes.map((mistake, i) => (
                    <div
                      key={i}
                      className="flex flex-row justify-start items-center cursor-pointer bg-paper p-2 rounded hover:shadow-md"
                      onClick={() => window.open(mistake.url, "mywindow")}
                    >
                      <div className="border w-fit text-5xl font-mono p-2 bg-pink rounded text-paper">
                        {/* <a href={mistake.url} target="_blank" rel="noreferrer"> */}
                        <p className="pb-1">{mistake.character}</p>
                        {/* </a> */}
                      </div>
                      <div className="lowercase p-1 ml-1 text-2xl">
                        <p>{mistake.meanings[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn bg-blue text-paper w-full mt-2">
                  study mistakes
                </button>
              </div>
            ) : // <p>no recent mistakes</p>
            null}
          </div>
        </div>
      </div>
    </div>
  );
};
