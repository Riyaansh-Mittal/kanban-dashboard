import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbArrowsSort } from "react-icons/tb";
import { FiPlusCircle } from "react-icons/fi";
import Column from "../components/Column";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, updateTaskLocation } from "../redux/slices/columnsSlice";
import { DragDropContext } from "react-beautiful-dnd";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; // Full viewport height
  padding: 20px 20px 0px 20px;
  box-sizing: border-box; // Padding included in the height calculation
  overflow: hidden; // Prevent any overflow from Root itself
`;

const Header = styled.header`
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Board = styled.main`
  flex: 1; // Fill the available space
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: auto;
  gap: 25px;
  padding: 0 20px; // Ensure padding is only horizontal
  margin: 0 -20px; // Adjust this if necessary
  align-self: stretch; // Ensure it stretches to fit horizontally

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
  flex-wrap: wrap; // Allows controls to wrap onto the next line on smaller screens

  @media (max-width: 768px) {
    justify-content: center; // Center-aligns controls on smaller screens
  }
`;

const Button = styled.button`
  border: 1.5px dashed #ccc;
  background-color: #fff;
  color: black;
  border-radius: 8px;
  padding: 10px 10px;
  height: 35px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 -2px 0px rgba(178, 183, 188, 0.2);
  gap: 10px;
  font-size: 15px;

  @media (max-width: 768px) {
    font-size: 13px; // Smaller font size on smaller screens
    padding: 8px 8px; // Smaller padding
    flex-grow: 1; // Allows buttons to expand and fill the space
  }
`;

const SortButton = styled(Button)`
  border: 1.5px solid #ccc; // Uses the same responsive settings as Button but with solid border
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
    margin-bottom: 10px; // Adds space below on smaller screens
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

function KanbanBoard() {
  const columns = useSelector((state) => state.columns.columns);
  const dispatch = useDispatch();

  const handleAddColumn = () => {
    dispatch(addColumn({ title: "" }));
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
 
    // If there's no destination, do nothing
    if (!destination) {
       return;
    }
    // If the task is dropped in the same position, do nothing
    if (
       source.droppableId === destination.droppableId &&
       source.index === destination.index
    ) {
       return;
    }
 
    // Dispatch an action to update the task location in the store
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
          <Button>
            <FiPlusCircle />
            Severity
          </Button>
          <Button>
            {" "}
            <FiPlusCircle />
            Status
          </Button>
          <Button>
            {" "}
            <FiPlusCircle />
            Pentest
          </Button>
          <Button>
            {" "}
            <FiPlusCircle />
            Target
          </Button>
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
          ))}{" "}
        </Board>
      </DragDropContext>
    </Root>
  );
}

export default KanbanBoard;
