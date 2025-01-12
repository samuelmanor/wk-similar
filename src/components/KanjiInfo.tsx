import React from "react";
import { FC } from "react";

interface KanjiInfoProps {
  children: React.ReactNode;
  childIndex: number;
  forceDisplay?: boolean;
}

/**
 * Displays information about a kanji
 * @param {React.ReactNode} children - kanji button to be wrapped by tooltip
 * @param {number} childIndex - index of kanji button in array of kanji answerbuttons
 */
export const KanjiInfo: FC<KanjiInfoProps> = ({
  children,
  childIndex,
  forceDisplay = false,
}) => {
  return (
    <div
      className={`tooltip ${forceDisplay ? "tooltip-open" : ""} ${
        childIndex === 0 || childIndex === 2 ? "tooltip-left" : "tooltip-right"
      }`}
      data-tip={"penis"}
    >
      <p onClick={() => console.log(children)}>test</p>
      {children}
    </div>
  );
};
