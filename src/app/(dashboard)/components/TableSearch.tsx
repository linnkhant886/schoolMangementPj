"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface TableSearchProps {
  onSearch?: (query: string) => void;
  searchType?: string; 
}

export default function TableSearch({ onSearch, searchType }: TableSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get(`${searchType}`) || "");

  const debouncedHandleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(`${searchType}`, value);
    } else {
      params.delete(`${searchType}`);
    }
    router.push(`?${params.toString()}`);
    if (onSearch) {
      onSearch(value);
    }
  }, 300); // 500ms debounce delay

  useEffect(() => {
    const query = searchParams.get(`${searchType}`) || "";
    setSearchQuery(query);
  }, [searchParams, searchType]);

  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        placeholder="Search from table..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          debouncedHandleSearch(e.target.value);
        }}
      />
    </div>
  );
}