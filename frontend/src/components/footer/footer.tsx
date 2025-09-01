import { getYear } from "date-fns";

export function Footer() {
  const currentYear = getYear(new Date());

  return (
    <footer className="h-16 shrink-0 border-t px-4 flex items-center justify-center text-sm">
      © {currentYear} Подарки с Байкала. Все права защищены.
    </footer>
  );
}
