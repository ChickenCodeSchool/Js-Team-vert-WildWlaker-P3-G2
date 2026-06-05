const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const API_ROUTES = {
  barbers: `${BASE_URL}/api/barbers`,
  events: `${BASE_URL}/api/events`,
  prestations: `${BASE_URL}/api/prestations`,
};
