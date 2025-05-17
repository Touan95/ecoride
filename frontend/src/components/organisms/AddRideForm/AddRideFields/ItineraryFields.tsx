'use client';

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { inputClassname } from '@/components/ui/input';
import { Typography } from '@/components/atoms/Typography';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button as ShadButton } from '@/components/ui/button';
import { format } from 'date-fns';
import 'dayjs/locale/fr';
import clsxm from '@/utils/clsxm';
import { fr } from 'date-fns/locale';
import AddressAutocompleteInput, { OnSelectAddressProps } from '@/components/molecules/AddressAutocompleteInput/AddressAutocompleteInput';
import { TbMap2 } from 'react-icons/tb';

interface ItineraryFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
  departureLocationError?: string;
  arrivalLocationError?: string;
}

export const ItineraryFields = ({ form, departureLocationError, arrivalLocationError }: ItineraryFieldsProps) => {
  const now = new Date();

  const handleDateSelect = (dateType: 'arrivalDate' | 'departureDate') => (date: Date | undefined) => {
    if (date) {
      form.setValue(dateType, date);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', value: string, dateType: 'arrivalDate' | 'departureDate') => {
    const currentDate = form.getValues(dateType) || new Date();
    const newDate = new Date(currentDate);

    if (type === 'hour') {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue(dateType, newDate);
  };

  const handleSelectLocation =
    (locationType: 'departureLocation' | 'arrivalLocation') =>
    ({ location }: OnSelectAddressProps) => {
      form.setValue(locationType, location);
    };

  const renderDatePicker = (dateType: 'arrivalDate' | 'departureDate') => {
    return (
      <FormField
        control={form.control}
        name={dateType}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <Typography variant="cardTitleSm">Quand ?</Typography>
              <PopoverTrigger asChild>
                <FormControl>
                  <ShadButton
                    variant={'outline'}
                    className={clsxm(inputClassname, 'border-0 w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                  >
                    {field.value ? format(field.value, 'dd/MM/yyyy HH:mm') : <Typography color="placeholder">jj/mm/aaaa hh:mm</Typography>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </ShadButton>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-primary-50">
                <div className="sm:flex">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={handleDateSelect(dateType)}
                    initialFocus
                    locale={fr}
                    captionLayout="dropdown"
                    fromDate={now}
                  />
                  <div className="rdp p-3">
                    <Typography color="black" align="center" customClassName="text-sm font-medium pt-1 h-7 content-center">
                      Heure
                    </Typography>
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 24 }, (_, i) => i)
                            .reverse()
                            .map((hour) => (
                              <ShadButton
                                key={hour}
                                size="icon"
                                variant={field.value && field.value.getHours() === hour ? 'default' : 'ghost'}
                                className="sm:w-full shrink-0 aspect-square"
                                onClick={() => handleTimeChange('hour', hour.toString(), dateType)}
                              >
                                {hour}
                              </ShadButton>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                            <ShadButton
                              key={minute}
                              size="icon"
                              variant={field.value && field.value.getMinutes() === minute ? 'default' : 'ghost'}
                              className="sm:w-full shrink-0 aspect-square"
                              onClick={() => handleTimeChange('minute', minute.toString(), dateType)}
                            >
                              {minute.toString().padStart(2, '0')}
                            </ShadButton>
                          ))}
                        </div>
                        <ScrollBar orientation="horizontal" className="sm:hidden" />
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div className=" w-full rounded-xl p-5 shadow bg-primary-50">
      <div className="flex flex-col gap-5 relative justify-center w-full items-center">
        <Typography align="center" variant="cardTitle" color="primary">
          Votre itinéraire
        </Typography>
        <TbMap2 size={50} className="text-primary-900" />
      </div>
      <div className="grid md:grid-cols-2 grid-rows-1 gap-10 ">
        <div className="flex flex-col md:gap-4 gap-1">
          <Typography variant="cardTitle" align="center">
            Départ
          </Typography>
          <Typography variant="cardTitleSm">Où</Typography>
          <AddressAutocompleteInput onSelect={handleSelectLocation('departureLocation')} error={departureLocationError} />
          {renderDatePicker('departureDate')}
        </div>
        <div className="flex flex-col md:gap-4 gap-1">
          <Typography variant="cardTitle" align="center">
            Arrivée
          </Typography>
          <Typography variant="cardTitleSm">Où</Typography>
          <AddressAutocompleteInput onSelect={handleSelectLocation('arrivalLocation')} error={arrivalLocationError} />
          {renderDatePicker('arrivalDate')}
        </div>
      </div>
      <Typography variant="extraSmall">Vos trajets sont visibles publiquement, mais sans affichage d&apos;adresse exacte.</Typography>
    </div>
  );
};
