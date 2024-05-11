import { writeStorage, useLocalStorage } from "@Test/local-storage";
import Notes from "../Notes";
import StylesLeftSidePannel from "./LeftSidePannel.module.css";
import React, { useState, useEffect } from "react";

const LeftSidePannel = ({ handleClick, id, groupName, color, create }) => {
const LeftSidePannel = ({ handleClick,handleUserIdClicked, id, groupName, color, create }) => {
const [clickedButton, setClickedButton] = useState(null);
const storedDataString = localStorage.getItem("notesData");
const storedDataString = localStorage.getItem("groupNamesData");
  const storedData = JSON.parse(storedDataString) || [];
  const newId =
  storedData.length > 0 ? storedData[storedData.length - 1].id + 1 : 1;
  const newData = {
    id: newId,
    groupName: groupName,
    color: color,
    create: create,
  };
  const [userIdClicked] = useLocalStorage("userIdClicked");
  const submitCheck = () => {
    if (groupName !== "" && create === true) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (submitCheck()) {
      storedData.push(newData);
      localStorage.setItem("notesData", JSON.stringify(storedData));
      localStorage.setItem("groupNamesData", JSON.stringify(storedData));
    }
  }, [groupName, create, newData]);
  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
  };
  const buttonStyle = (buttonId) => {
    return {
      backgroundColor: clickedButton === buttonId ? "#F7ECDC" : "transparent",
      color: "white",
      minWidth: "100%",
      minHeight: "61px",
      // border: "1px solid black",
      display: "flex",
      justifyContent: "flex-start",
      borderRadius: "2rem 0rem 0rem 2rem",
      // width: "31vw",
      // padding: "4% 0.9% 4% 5%",
    };
  };
  return (
    <div className={StylesLeftSidePannel.leftSidePannel}>
      <h1>Pocket Notes</h1>
      <div className={StylesLeftSidePannel.center}>
        <button
          className={StylesLeftSidePannel.createNotesGroup}
          onClick={() => handleClick(true)}
        >
          {" "}
          <img src="assets/+.svg" alt="+" style={{ minWidth: "21px" }} /> Create
          Notes group
        </button>
        <div>
          <br />
          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            {storedData.map((group) =>
              group.create ? (
                <div className={StylesLeftSidePannel.notesGroupSlected}>

                  <span className={StylesLeftSidePannel.act}
                    style={buttonStyle(group.id)}
                    onClick={(_) => {
                      writeStorage("userIdClicked", group.id);
                      handleUserIdClicked(group.id);
                      handleButtonClick(group.id);
                    }}
                  >
                    <NotesGroup
                      key={group.id}
                      groupName={group.groupName}
                      color={group.color}
                      buttonColorId={userIdClicked}
                      buttonColorId={group.id}
                    />
                  </span>
                </div>
                ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftSidePannel;