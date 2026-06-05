import { useEffect, useState } from "react";
import { API_ROUTES } from "../api/routes";
import type { Barber } from "../types/barber";

function useBarbers() {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    fetch(API_ROUTES.barbers)
      .then((res) => res.json())
      .then((data) => setBarbers(data));
  }, []);

  return barbers;
}

export default useBarbers;
