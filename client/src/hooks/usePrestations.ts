import { useCallback, useEffect, useState } from "react";
import type { Prestation } from "../types/prestation";

function usePrestations() {
  const [prestations, setPrestations] = useState<Prestation[]>([]);

  const fetchPrestations = useCallback(() => {
    fetch("/api/prestations")
      .then((res) => res.json())
      .then((data) => setPrestations(data));
  }, []);

  useEffect(() => {
    fetchPrestations();
  }, [fetchPrestations]);

  return { prestations, refetch: fetchPrestations };
}

export default usePrestations;
