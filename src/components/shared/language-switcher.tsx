"use client";

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const [language, setLanguage] = useState("en");

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-[100px] h-9 text-sm">
        <Languages className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="ru">RU</SelectItem>
      </SelectContent>
    </Select>
  );
}
