
import { useRef, useState } from 'react';
import { Check, ChevronsUpDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const LanguageSelector = () => {
  const { currentLanguage, setLanguage, availableLanguages, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const popoverTriggerRef = useRef<HTMLButtonElement>(null);

  // Make sure availableLanguages is always an array even if it's undefined
  const languages = Array.isArray(availableLanguages) ? availableLanguages : [];

  const handleSelect = (value: string) => {
    setLanguage(value);
    setOpen(false);
    // Force focus back to the trigger button to avoid focus loss
    setTimeout(() => {
      popoverTriggerRef.current?.focus();
    }, 0);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={popoverTriggerRef}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label={t('select_language')}
          className="flex items-center justify-between gap-2 px-3 w-full md:w-auto"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{t('language')}</span>
          <span className="font-medium">
            {languages.find(lang => lang.code === currentLanguage)?.nativeName || 'English'}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={t('select_language')} />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.code}
                  value={language.code}
                  onSelect={() => handleSelect(language.code)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentLanguage === language.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="mr-2">{language.nativeName}</span>
                  <span className="text-xs text-muted-foreground">
                    {language.name !== language.nativeName ? language.name : ''}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSelector;
