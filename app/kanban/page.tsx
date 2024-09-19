import KanbanBoard from "../_components/KanbanBoard";
const KanbanPage: React.FC = () => {
  return (
    <div className="container mx-auto py-20 px-8">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
};

export default KanbanPage;
