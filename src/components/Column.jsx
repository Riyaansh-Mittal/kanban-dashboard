import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTask,
  deleteTask,
  removeColumn,
  updateColumnTitle,
} from "../redux/slices/columnsSlice";
import TaskCard from "./TaskCard";
import { GoPlus } from "react-icons/go";
import styled from "styled-components";
import { FaCircle } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { Droppable, Draggable } from "react-beautiful-dnd";

const ColumnHeader = styled.h2`
  color: #333;
  font-size: 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  top: 100%;
  right: 0;
  z-index: 1000;
  width: 130px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;

  button {
    width: 100%;
    padding: 4px;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const Root = styled.section`
  flex: 1;
  min-width: 280px;
  max-width: 280px;
  border-radius: 8px;
  margin: 0 0px;

  @media (max-width: 768px) {
    flex-basis: 100%;
    margin: 10px 0;
  }
`;

const TopicInput = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  background: none;
  outline: none;
  font-size: 20px;
  overflow: hidden;
  max-height: 20px;
  font-weight: 600;
`;

const Column = ({ id, title, tasks }) => {
  const dispatch = useDispatch();
  const [droppableId, setDroppableId] = useState("");

  useEffect(() => {
    const destColumnNumber = id.match(/\d+/)[0];
    const generatedId = `column-${destColumnNumber}`;
    setDroppableId(generatedId);
  }, [id]);

  const handleAddTask = () => {
    const newTaskNumber = generateTaskNumber();
    const creationTime = getCurrentTimeFormatted();
    dispatch(
      addTask({
        columnId: id,
        task: {
          taskNumber: newTaskNumber,
          topic: "",
          severity: "",
          target: "",
          status: "",
          creationTime: creationTime,
        },
      })
    );
  };

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ columnId: id, taskId }));
  };
  const handleDeleteColumn = (id) => {
    dispatch(removeColumn({ columnId: id }));
  };

  const generateTaskNumber = () => {
    return 1000 + Math.floor(Math.random() * 9000);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const handleFocus = (event) => {
    setIsEditing(true);
    event.target.focus();
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateTitle(editTitle);
  };

  const handleChange = (event) => {
    setEditTitle(event.target.value);
  };

  const updateTitle = (newTopic) => {
    dispatch(updateColumnTitle({ columnId: id, title: newTopic }));
  };

  const getCurrentTimeFormatted = () => {
    const now = new Date();
    const options = {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat("en-US", options).format(now);
  };

  return (
    <Root>
      <ColumnHeader>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <FaCircle style={{ width: "7px", height: "7px" }} />
          {isEditing ? (
            <TopicInput
              value={editTitle}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <span style={{ fontWeight: "600" }} onClick={handleFocus}>
              {editTitle || "Click to add a topic..."}
            </span>
          )}

          {tasks.length > 0 && (
            <span style={{ color: "#a2a0a0" }}>{tasks.length}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={toggleDropdown}>
            <BsThreeDots />
          </button>
          {showDropdown && (
            <DropdownMenu>
              <button onClick={() => handleDeleteColumn(id)}>
                Delete Category
              </button>
              {tasks.map((task) => (
                <button
                  key={task.taskNumber}
                  onClick={() => handleDeleteTask(task.taskNumber)}
                >
                  Delete Task #{task.taskNumber}
                </button>
              ))}
            </DropdownMenu>
          )}
          <button onClick={handleAddTask}>
            <GoPlus />
          </button>
        </div>
      </ColumnHeader>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <Draggable
                key={task.taskNumber.toString()}
                draggableId={task.taskNumber.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard key={index} columnId={id} {...task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Root>
  );
};

export default Column;
