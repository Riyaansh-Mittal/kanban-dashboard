import styled from "styled-components";
import Column from "../components/Column";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskLocation } from "../redux/slices/columnsSlice";
import { DragDropContext } from "react-beautiful-dnd";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Switch from "../components/Switch";
import Controls from "../components/Controls";
import { useDebounce } from "../utils/useDebounce";
import { useState } from "react";
import filterTasksBySearch from "../utils/FilterTasksBySearch";

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

const ControlsContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

const SignOutButton = styled(Button)`
  border: 1.5px solid black;
`;

function KanbanBoard() {
  const columns = useSelector((state) => state.columns.columns);
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || destination.index == null) {
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination ? destination.droppableId : null;
      const sourceIndex = source.index;
      const destinationIndex = destination ? columns.find(column => `column-${column.id}` === destination.droppableId).tasks.length : 0;
      dispatch(
        updateTaskLocation({
          taskId: draggableId,
          sourceColumnId,
          destinationColumnId,
          sourceIndex,
          destinationIndex,
        })
      );
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

  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

const searchedTasks = columns.map((column) => ({
  ...column,
  tasks: filterTasksBySearch(column.tasks, debouncedSearchQuery),
}));

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Root>
      <Header>
        <h1>Vulnerabilities</h1>
        <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
      </Header>
      <ControlsContainer>
        <Controls onSearchChange={handleSearchChange} />
        <Switch />
      </ControlsContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Board>
          {searchedTasks.map((column, index) => (
            <Column key={column.id} {...column} index={index} />
          ))}
        </Board>
      </DragDropContext>
    </Root>
  );
}

export default KanbanBoard;
