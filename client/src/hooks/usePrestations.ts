import { useEffect, useState } from "react";
import type { Prestation } from "../types/prestation";

const API_URL = import.meta.env.VITE_API_URL;

function usePrestations() {
  const [prestations, setPrestations] = useState<Prestation[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/api/prestations`)
      .then((res) => res.json())
      .then((data) => setPrestations(data));
  }, []);

  return prestations;
}

export default usePrestations;
