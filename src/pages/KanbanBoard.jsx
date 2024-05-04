import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbArrowsSort } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";
import Column from "../components/Column";
import { useDispatch, useSelector } from "react-redux";
import {
  addColumn,
  unselectTask,
  updateTaskLocation,
  updateTaskSeverity,
  updateTaskStatus,
  updateTaskTarget,
} from "../redux/slices/columnsSlice";
import { DragDropContext } from "react-beautiful-dnd";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Header = styled.header`
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Board = styled.main`
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: auto;
  gap: 25px;
  padding: 0 20px;
  margin: 0 -20px;
  align-self: stretch;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Controls = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  border: 1.5px dashed #ccc;
  background-color: #fff;
  color: black;
  border-radius: 8px;
  padding: 10px 10px;
  height: 35px;
  max-width: 140px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 -2px 0px rgba(178, 183, 188, 0.2);
  gap: 10px;
  font-size: 15px;
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 8px 8px;
    flex-grow: 1;
  }
`;

const SortButton = styled(Button)`
  border: 1.5px solid #ccc;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1.5px solid #ccc;
  border-radius: 8px;
  height: 35px;
  box-shadow: inset 0 -2px 0px rgba(178, 183, 188, 0.2);
  width: 205px;
  @media (max-width: 768px) {
    margin-bottom: 10px;
    width: 100%;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 100%;
  height: 80%;
`;

const MagnifyingGlassIcon = styled.span`
  color: #6c7177;
  margin-left: 10px;
  margin-right: 5px;
`;

const SwitchLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SwitchCheckbox = styled.input`
  margin-left: 10px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Dropdown = styled.select`
  padding: 5px;
  border-radius: 5px;
`;

const severityOptions = [
  { value: "", label: "Select Severity" },
  { value: "Critical", label: "Critical" },
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
  { value: "", label: "Remove Severity" },
];
const targetOptions = [
  { value: "", label: "Select Target" },
  { value: "Hypejab", label: "Hypejab" },
  { value: "Getastra", label: "Getastra" },
  { value: "Source Code", label: "Source Code" },
  { value: "", label: "Remove Target" },
];

function KanbanBoard() {
  const columns = useSelector((state) => state.columns.columns);
  const dispatch = useDispatch();

  const handleAddColumn = () => {
    dispatch(addColumn({ title: "" }));
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    dispatch(
      updateTaskLocation({
        taskId: draggableId,
        sourceColumnId: source.droppableId,
        destinationColumnId: destination.droppableId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      })
    );
  };

  const selectedTask = useSelector((state) => state.columns.selectedTask);

  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [isSeverityDropdownOpen, setIsSeverityDropdownOpen] = useState(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState(false);
  const [isStatusInputOpen, setIsStatusInputOpen] = useState(false);
  const [statusValue, setStatusValue] = useState("");

  const handleSeverityButtonClick = () => {
    setIsSeverityDropdownOpen(!isSeverityDropdownOpen);
  };
  const handleTargetButtonClick = () => {
    setIsTargetDropdownOpen(!isTargetDropdownOpen);
  };
  const handleStatusButtonClick = () => {
    setIsStatusInputOpen(!isStatusInputOpen);
  };
  const handleStatusChange = (event) => {
    setStatusValue(event.target.value);
  };

  const handleLabelChange = (event, label) => {
    const newValue = event.target.value;
    if (label === "severity") {
      dispatch(
        updateTaskSeverity({
          columnId: selectedTask.columnId,
          taskNumber: selectedTask.taskNumber,
          severity: newValue,
        })
      );
      setSelectedSeverity("");
      setIsSeverityDropdownOpen(!isSeverityDropdownOpen);
    } else if (label === "target") {
      dispatch(
        updateTaskTarget({
          columnId: selectedTask.columnId,
          taskNumber: selectedTask.taskNumber,
          target: newValue,
        })
      );
      setSelectedTarget("");
      setIsTargetDropdownOpen(!isTargetDropdownOpen);
    }
    dispatch(unselectTask());
  };
  const handleStatusSubmit = () => {
    if (
      statusValue.trim() !== "" &&
      Number(statusValue.trim()) >= 0 &&
      Number(statusValue.trim()) <= 10
    ) {
      dispatch(
        updateTaskStatus({
          columnId: selectedTask.columnId,
          taskNumber: selectedTask.taskNumber,
          status: statusValue.trim(),
        })
      );
      setIsStatusInputOpen(false);
      setStatusValue("");
    }
  };

  return (
    <Root>
      <Header>
        <h1>Vulnerabilities</h1>
      </Header>
      <Controls>
        <ControlsContainer>
          <SearchInput>
            <MagnifyingGlassIcon>
              <HiMiniMagnifyingGlass size={15} />
            </MagnifyingGlassIcon>
            <Input
              type="search"
              placeholder="Search by issue name..."
              style={{ marginBottom: "2px", borderRadius: "10px", color: "" }}
            />
          </SearchInput>
          <SortButton>
            <TbArrowsSort style={{ transform: "scaleX(-1)" }} />
            Sort by
          </SortButton>
          <Button onClick={handleAddColumn}>
            <FiPlusCircle />
            Assigned To
          </Button>
          <LabelWrapper>
            <Button onClick={handleSeverityButtonClick}>
              <FiPlusCircle />
              Severity
            </Button>
            {selectedTask && isSeverityDropdownOpen && (
              <Dropdown
                value={selectedSeverity}
                onChange={(e) => handleLabelChange(e, "severity")}
              >
                {severityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Dropdown>
            )}
          </LabelWrapper>
          <LabelWrapper>
            <Button onClick={handleStatusButtonClick}>
              <FiPlusCircle />
              Status
            </Button>
            {selectedTask && isStatusInputOpen && (
              <div>
                <Input
                  type="text"
                  placeholder="Enter status..."
                  value={statusValue}
                  onChange={handleStatusChange}
                />
                <Button onClick={handleStatusSubmit}>Save</Button>
              </div>
            )}
          </LabelWrapper>

          <Button>
            <FiPlusCircle />
            Pentest
          </Button>
          <LabelWrapper>
            <Button onClick={handleTargetButtonClick}>
              <FiPlusCircle />
              Target
            </Button>
            {selectedTask && isTargetDropdownOpen && (
              <Dropdown
                value={selectedTarget}
                onChange={(e) => handleLabelChange(e, "target")}
              >
                {targetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Dropdown>
            )}
          </LabelWrapper>
        </ControlsContainer>
        <SwitchLabel>
          Switch to List
          <SwitchCheckbox type="checkbox" />
        </SwitchLabel>
      </Controls>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Board>
          {columns.map((column, index) => (
            <Column key={column.id} {...column} index={index} />
          ))}
        </Board>
      </DragDropContext>
    </Root>
  );
}

export default KanbanBoard;
