import { useEffect, useState } from "react";
import type { Barber } from "../types/barber";

function useBarbers() {
  const [barbers, setBarbers] = useState<Barber[]>([]);

  useEffect(() => {
    fetch("/api/barbers")
      .then((res) => res.json())
      .then((data) => setBarbers(data));
  }, []);

  return barbers;
}

export default useBarbers;
