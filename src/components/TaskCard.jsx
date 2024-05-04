import React, { useState } from "react";
import styled from "styled-components";
import { GiDiamonds } from "react-icons/gi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { CgSmartphone } from "react-icons/cg";
import { LuMonitorSpeaker } from "react-icons/lu";
import { LuMonitor } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { updateTaskTopic } from "../redux/slices/columnsSlice";
import Spinner from "./Spinner";

// Styled components definitions...

const Card = styled.div`
  background-color: #fff;
  border: 1.5px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  position: relative;
`;

const Diamond = styled.span`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: #fff;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;;
`;

const TaskInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6c7177;
  font-size: 14px;
`;

const TaskTopic = styled.h3`
  font-weight: 600;
  font-size: 15px;
  overflow-wrap: break-word;  // Ensures words break to prevent overflow: ;
  cursor: pointer;
`;

const Tags = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
  flex-wrap: wrap;
  align-items: center;
  width: 85%;
`;

const SeverityTag = styled.span`
  padding: 1px 7px;
  border-radius: 25px;
  font-size: 12.5px;
  color: #fff;
  background-color: ${({ severity }) => getSeverityDetails(severity).color};
  box-shadow: inset 0 -3px 0px ${({ severity }) => getSeverityDetails(severity).shadow};
`;

const TargetTag = styled.span`
  display: flex;
  align-items: center;
  padding: 1px 7px;
  border-radius: 25px;
  font-size: 12.5px;
  color: ${({ target }) => getTargetDetails(target).color};
  background-color: ${({ target }) => getTargetDetails(target).bgcolor};
  box-shadow: inset 0 -2.5px 0px ${({ target }) => getTargetDetails(target).shadow};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95px;

  svg {
    flex-shrink: 0; // Prevent icon from shrinking
    margin-right: 2px;
  }
  .text-container {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    flex-grow: 1; // Allow text container to fill available space
  }
`;

const TickMark = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${(props) => (props.clicked ? "#007BFF" : "#ccc")};
  cursor: pointer;
`;

// Helper function to parse the tag text
const parseTag = (tag) => {
  const splitTag = tag.split(":");
  return splitTag.length > 1 ? splitTag[1].trim() : splitTag[0].trim();
};

const getSeverityDetails = (severity) => {
  if (!severity) return { color: "#eee", shadow: "rgba(0,0,0,0.2)" }; // Default gray

  switch (severity.toLowerCase()) {
    case "critical":
      return { color: "#b42727", shadow: "rgba(140, 37, 37, 0.4)" }; // Dark red
    case "high":
      return { color: "#e74135", shadow: "rgba(186, 49, 40, 0.4)" }; // Red
    case "medium":
      return { color: "#de7b25", shadow: "rgba(176, 91, 27, 0.4)" }; // Orange
    case "low":
      return { color: "#e7a712", shadow: "rgba(174, 147, 15, 0.4)" }; // Yellow
    default:
      return { color: "#eee", shadow: "rgba(0,0,0,0.2)" }; // Default gray
  }
};

const getTargetDetails = (target) => {
  switch (target) {
    case "Hypejab":
      return {
        bgcolor: "#f1e8f7",
        color: "#8a2cc8",
        shadow: "rgba(227, 218, 228, 0.4)",
      };
    case "Getastra":
      return {
        bgcolor: "#ebf2ff",
        color: "#1f5db0",
        shadow: "rgba(227, 229, 237, 0.4)",
      }; // Blue with globe symbol
    case "Source Code":
      return {
        bgcolor: "#faf0e2",
        color: "#d5902e",
        shadow: "rgba(228, 223, 218, 0.4)",
      }; // Yellow with computer symbol
    default:
      return { bgcolor: "#ccc" }; // Default grey with tag symbol
  }
};

const getIconComponent = (target) => {
  switch (target) {
    case "Hypejab":
      return <CgSmartphone />;
    case "Getastra":
      return <LuMonitorSpeaker />;
    case "Source Code":
      return <LuMonitor />;
    default:
      return ""; // Default icon
  }
};

const TopicInput = styled.textarea`
  width: 100%;
  border: none;
  resize: none; // Prevents resizing the textarea
  background: none;
  outline: none;
  font-size: 16px;
  overflow: hidden; // Ensures the textarea does not overflow its container
  max-height: 20px; // Minimum height to accommodate single-line input
  font-weight: 600;
`;


const TaskCard = ({ columnId, taskNumber, topic, severity, target, creationTime, provided, snapshot }) => {
  const [tickClicked, setTickClicked] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editTopic, setEditTopic] = useState(topic);
  
  const dispatch = useDispatch();

  const handleFocus = (event) => {
    setIsEditing(true);
    event.target.focus();
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateTopic(editTopic); // Function to update the topic in the global state or parent component
  };

  const handleChange = (event) => {
    setEditTopic(event.target.value);
  };

  const updateTopic = (newTopic) => {
    dispatch(updateTaskTopic({ columnId, taskId: taskNumber, topic: newTopic }));
  };
  return (
    <Card>
      <TaskInfo>
        <p>
          #{taskNumber} <span>•</span> {creationTime}
        </p>
        <Diamond>
          <GiDiamonds size={20} />
        </Diamond>
      </TaskInfo>
      {isEditing ? (
        <TopicInput
          value={editTopic}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <TaskTopic onClick={handleFocus}>
          {editTopic || "Click to add a topic..."}
        </TaskTopic>
      )}
      {/* <TaskTopic>{topic}</TaskTopic> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Tags>
          {severity !== ""?<SeverityTag severity={severity}>{severity}</SeverityTag>: ""}
          {target !== ""?<TargetTag target={target}>
            {getIconComponent(target)}
            <span className="text-container">{target}</span>
          </TargetTag>:""}
          <Spinner value={6.5} />
        </Tags>
        <RiVerifiedBadgeFill
          size={20}
          clicked={tickClicked}
          onClick={() => setTickClicked(!tickClicked)}
          style={{
            cursor: "pointer",
            backgroundColor: `${(props) =>
              props.clicked ? "#007BFF" : "#ccc"}`,
          }}
        />
      </div>
    </Card>
  );
};

export default TaskCard;
