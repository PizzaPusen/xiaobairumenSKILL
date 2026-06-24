import { getAllModels } from "@/lib/data";
import { ModelsTable } from "@/components/models/models-table";

export default function ModelsPage() {
  const models = getAllModels();
  return <ModelsTable models={models} />;
}
