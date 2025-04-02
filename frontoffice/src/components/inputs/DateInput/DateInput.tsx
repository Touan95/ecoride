'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button as ShadButton } from '@/components/ui/button';
import clsxm from '@/utils/clsxm';
import { inputClassname } from '@/components/ui/input';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { fr } from 'date-fns/locale';
import { useState } from 'react';

dayjs.locale('fr');

interface DateInputProps {
  placeholder?: string;
  onChange?: (date: Date) => void;
  className?: string;
}

export const DateInput = ({ placeholder = 'Choisir une date', onChange, className = '' }: DateInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formattedDate, setFormattedDate] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const onSelect = (date: Date | undefined) => {
    if (date) {
      // Force UTC midnight to avoid timezone issues
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

      setSelectedDate(utcDate);
      setFormattedDate(dayjs(utcDate).format('DD/MM/YYYY'));

      if (onChange) {
        onChange(utcDate);
      }

      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ShadButton className={clsxm(inputClassname, className, !formattedDate && 'text-muted-foreground')}>
          {formattedDate ?? <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </ShadButton>
      </PopoverTrigger>
      <PopoverContent className="w-full z-[9999] bg-primary-50" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
          locale={fr}
          fromDate={new Date('1900-01-01')}
          toDate={new Date()}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
};
