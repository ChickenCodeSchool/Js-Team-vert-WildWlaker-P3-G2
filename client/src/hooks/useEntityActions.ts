import { useCallback } from "react";
import Swal from "sweetalert2";

export interface BaseEntity {
  id: number;
  status?: string;
  firstname?: string;
  lastname?: string;
  birthday?: string | null;
}

const formatBirthday = (val: string | null | undefined) => {
  if (!val) return null;
  return String(val).substring(0, 10);
};
export function useEntityActions<T extends BaseEntity>(options: {
  apiBase: string;
  idField: string;
  onActionComplete?: () => void;
}) {
  const { apiBase, idField, onActionComplete } = options;

  const handleSave = useCallback(
    async (entity: T) => {
      const originalStatus = entity.status?.toLowerCase();
      const newStatus = entity.status?.toLowerCase();

      if (originalStatus && originalStatus !== newStatus) {
        const isSuspend = newStatus === "suspendu";
        const result = await Swal.fire({
          title: isSuspend ? "Suspendre le compte ?" : "Réactiver le compte ?",
          text: isSuspend
            ? `Vous changez le statut vers "Suspendu". Êtes-vous sûr ?`
            : `Vous allez réactiver le compte. Confirmer ?`,
          icon: isSuspend ? "warning" : "success",
          showCancelButton: true,
          confirmButtonColor: isSuspend ? "#ff9f43" : "#10ac84",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, confirmer",
          cancelButtonText: "Annuler",
        });
        if (!result.isConfirmed) return;
      }

      try {
        const payload = {
          ...entity,
          birthday: formatBirthday(entity.birthday),
        };

        const response = await fetch(`${apiBase}/api/${idField}/${entity.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Erreur lors de la mise à jour");

        Swal.fire({
          icon: "success",
          title: "Succès !",
          text: "Le profil a été mis à jour.",
          timer: 2000,
          showConfirmButton: false,
        });
        onActionComplete?.();
      } catch (error) {
        console.error("Erreur onSave :", error);
        Swal.fire({
          icon: "error",
          title: "Oups...",
          text: "Une erreur est survenue.",
        });
      }
    },
    [apiBase, idField, onActionComplete],
  );

  const handleToggleSuspend = useCallback(
    async (entity: T) => {
      const isSuspended = entity.status?.toLowerCase() === "suspendu";
      const nextStatus = isSuspended ? "Actif" : "Suspendu";

      const result = await Swal.fire({
        title: isSuspended ? "Réactiver le compte ?" : "Suspendre le compte ?",
        text: `Êtes-vous sûr de vouloir ${isSuspended ? "réactiver" : "suspendre"} le compte ?`,
        icon: isSuspended ? "success" : "warning",
        showCancelButton: true,
        confirmButtonColor: isSuspended ? "#10ac84" : "#ff9f43",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, confirmer",
        cancelButtonText: "Annuler",
      });

      if (!result.isConfirmed) return;

      try {
        const payload = {
          ...entity,
          status: nextStatus,
          birthday: formatBirthday(entity.birthday),
        };

        const response = await fetch(`${apiBase}/api/${idField}/${entity.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Erreur lors de la mise à jour");

        Swal.fire({
          icon: "success",
          title: "Succès !",
          text: `Le compte est maintenant ${nextStatus}`,
          timer: 2000,
          showConfirmButton: false,
        });
        onActionComplete?.();
      } catch (error) {
        console.error("Erreur toggle :", error);
        Swal.fire("Erreur", "Une erreur est survenue", "error");
      }
    },
    [apiBase, idField, onActionComplete],
  );

  return { handleSave, handleToggleSuspend };
}
