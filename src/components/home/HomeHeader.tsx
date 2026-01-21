import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HomeHeader() {
  return (
    <div className="flex gap-2">
      <Select defaultValue="kategori">
        <SelectTrigger className="w-[140px] py-6 bg-[#1B2B36] text-white rounded-sm h-12">
          <SelectValue placeholder="Kategori" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="kategori">Kategori</SelectItem>
          <SelectItem value="health">Health</SelectItem>
          <SelectItem value="career">Career</SelectItem>
        </SelectContent>
      </Select>
      <div className="relative flex-1">
        <Input
          placeholder="Search..."
          className="h-12 rounded-sm bg-white border-none shadow-sm pr-10"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}