import { useEffect, useState } from "react";
import type { Prestation } from "../types/prestation";

function usePrestations() {
  const [prestations, setPrestations] = useState<Prestation[]>([]);

  useEffect(() => {
    fetch("/api/prestations")
      .then((res) => res.json())
      .then((data) => setPrestations(data));
  }, []);

  return prestations;
}

export default usePrestations;
