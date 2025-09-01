import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  IconInfoHexagon,
  IconThumbUp,
  IconTruckDelivery,
} from "@tabler/icons-react";

export function FeaturesBlock() {
  const features = [
    {
      icon: <IconThumbUp className="w-10 h-10 text-primary" />,
      title: "Высокое качество",
      description: "Только натуральные материалы и ручная работа",
    },
    {
      icon: <IconTruckDelivery className="w-10 h-10 text-primary" />,
      title: "Быстрая доставка",
      description: "Отправка по всей России",
    },
    {
      icon: <IconInfoHexagon className="w-10 h-10 text-primary" />,
      title: "Поддержка",
      description: "Помогаем с выбором и отвечаем на вопросы",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-card">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center px-4 sm:px-6">
        {features.map((f, i) => (
          <Card
            key={i}
            className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex flex-col items-center gap-4">
              {f.icon}
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                {f.title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {f.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
