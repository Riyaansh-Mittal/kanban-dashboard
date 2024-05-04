export default function filterTasksBySearch(columnTasks, searchQuery) {
    if (!searchQuery) return columnTasks; 
    return columnTasks.filter((task) =>
      task.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  