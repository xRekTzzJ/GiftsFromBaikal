'use client'

export function YandexSection() {
  return (
    <section className="w-full bg-accent  py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Что говорят наши клиенты
          </h2>

          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://yandex.ru/maps-reviews-widget/180757079754?comments"
              className="w-full h-full"
              frameBorder="0"
              title="Отзывы о компании"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Найти нас на карте
          </h2>

          <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://yandex.ru/map-widget/v1/org/podarki_s_baykala/180757079754/?ll=109.335008%2C55.637975&z=18.16"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              title="Карта магазина"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
