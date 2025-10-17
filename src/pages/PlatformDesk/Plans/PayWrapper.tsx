import { useParams } from "react-router-dom";
import { Pay } from "./Pay";

export function PayWrapper() {
  const { code } = useParams();
  return <Pay code={code ?? ""} />;
}