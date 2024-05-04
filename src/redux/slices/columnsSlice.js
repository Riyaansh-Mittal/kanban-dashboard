import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: [
    { id: 'column-1', title: "Draft", tasks: [] },
    { id: 'column-2', title: "Unsolved", tasks: [] },
    { id: 'column-3', title: "Under Review", tasks: [] },
    { id: 'column-4', title: "Solved", tasks: [] },
    { id: 'column-5', title: "Need Attention", tasks: [] },
  ],
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, task } = action.payload;
      const column = state.columns.find((c) => c.id === columnId);
      if (column) {
        column.tasks.push({
          ...task,
          id: `${columnId}` + `${column.tasks.length + 1}`,
          createdAt: new Date().toISOString(),
        });
      }
    },
    deleteTask: (state, action) => {
      const { columnId, taskId } = action.payload;
      const column = state.columns.find((column) => column.id === columnId);
      column.tasks = column.tasks.filter((task) => task.taskNumber !== taskId);
    },
    addColumn: (state, action) => {
      const newColumn = {
        id: `column-${state.columns.length + 1}`, // Generate a unique ID
        title: action.payload.title,
        tasks: [],
      };
      state.columns.push(newColumn);
    },
    removeColumn: (state, action) => {
      const { columnId } = action.payload;
      state.columns = state.columns.filter((col) => col.id !== columnId);
    },
    updateColumnTitle: (state, action) => {
      const { columnId, title } = action.payload;
      const column = state.columns.find((c) => c.id === columnId);
      if (column) {
        column.title = title;
      }
    },
    updateTaskTopic: (state, action) => {
      const { columnId, taskId, topic } = action.payload;
      const column = state.columns.find((c) => c.id === columnId);
      const task = column?.tasks.find((t) => t.id === taskId);
      if (task) {
        task.topic = topic;
      }
    },
    updateTaskLocation: (state, action) => {
      console.log(action.payload);
      const {
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
      } = action.payload;
      const sourceColumn = state.columns.find(
        (column) => column.id == sourceColumnId
      );
      const destColumn = state.columns.find(
        (column) => column.id == destinationColumnId
      );
      const destColumnNumber = destinationColumnId.match(/\d+/)[0];
      const [removed] = sourceColumn.tasks.splice(Number(sourceIndex), 1);
      removed.id = `${destColumnNumber}` + `${destinationIndex}`;
      destColumn.tasks.splice(destinationIndex, 0, removed);
    },
  },
});

export const {
  addTask,
  deleteTask,
  addColumn,
  removeColumn,
  updateColumnTitle,
  updateTaskTopic,
  updateTaskLocation,
} = columnsSlice.actions;

export default columnsSlice.reducer;
