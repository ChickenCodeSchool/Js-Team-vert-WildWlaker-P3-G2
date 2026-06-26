export type Event = {
  id_event: number;
  title: string;
  image_url: string;
  description: string;
  status: "brouillon" | "publié" | "plannifié" | "terminé";
  start_date: string;
  end_date: string;
  location: string;
};
