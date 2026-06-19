import { useMemo, useState } from "react";

export interface AdminFilterState {
  searchTerm: string;
  locationFilter: string;
  statusFilter: string;
  dateSortOrder: "asc" | "desc";
}

export function useAdminFilters<
  T extends {
    create_time: string;
    status?: string;
    postal_code?: string;
    firstname?: string;
    lastname?: string;
  },
>(initialData: T[], searchFields: (keyof T)[] = ["firstname", "lastname"]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateSortOrder, setDateSortOrder] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<keyof T>("create_time");

  const filteredData = useMemo(() => {
    let result = [...initialData];

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((item) =>
        searchFields.some((field) => {
          const val = item[field];
          return val && String(val).toLowerCase().includes(lower);
        }),
      );
    }

    if (locationFilter) {
      result = result.filter((item) => {
        if ("location_type" in item) {
          return (
            (item as { location_type: string }).location_type === locationFilter
          );
        }
        const val = item.postal_code;
        return val && String(val).startsWith(locationFilter);
      });
    }

    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter);
    }

    result.sort((a, b) => {
      const timeA = a[sortField]
        ? new Date(a[sortField] as string).getTime()
        : 0;
      const timeB = b[sortField]
        ? new Date(b[sortField] as string).getTime()
        : 0;
      return dateSortOrder === "desc" ? timeB - timeA : timeA - timeB;
    });

    return result;
  }, [
    initialData,
    searchTerm,
    locationFilter,
    statusFilter,
    dateSortOrder,
    sortField,
    searchFields,
  ]);

  return {
    searchTerm,
    setSearchTerm,
    locationFilter,
    setLocationFilter,
    statusFilter,
    setStatusFilter,
    dateSortOrder,
    setDateSortOrder,
    sortField,
    setSortField,
    filteredData,
  };
}
