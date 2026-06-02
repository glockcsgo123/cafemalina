export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">
      <h1 className="text-3xl font-extrabold font-[family-name:var(--font-heading)] tracking-tight mb-2">
        Политика конфиденциальности
      </h1>
      <p className="text-sm text-muted-foreground mb-8">Дата: 02 июня 2026 г.</p>

      <div className="prose prose-sm max-w-none space-y-6 text-sm text-foreground/80 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-foreground mb-2">1. Общие положения</h2>
          <p>
            Настоящая Политика конфиденциальности разработана в соответствии с требованиями
            Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет
            порядок обработки персональных данных пользователей сайта Кафе Malina.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">
            2. Какие данные мы собираем
          </h2>
          <p>При оформлении заказа мы собираем следующие персональные данные:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Имя</li>
            <li>Номер телефона</li>
            <li>Адрес доставки</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">3. Цели обработки данных</h2>
          <p>
            Ваши данные используются исключительно для обработки и доставки заказов:
            подтверждения заказа по телефону, уточнения адреса доставки и состава заказа.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">
            4. Срок хранения данных
          </h2>
          <p>
            Персональные данные хранятся не более 1 (одного) года с момента последнего
            оформления заказа, после чего удаляются.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">
            5. Передача данных третьим лицам
          </h2>
          <p>
            Мы не передаём ваши персональные данные третьим лицам, за исключением случаев,
            предусмотренных законодательством Российской Федерации.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">6. Использование cookie</h2>
          <p>
            Сайт использует файлы cookie для обеспечения работы сервисов и улучшения
            пользовательского опыта. Продолжая использование сайта, вы соглашаетесь с
            использованием cookie.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">
            7. Права субъекта персональных данных
          </h2>
          <p>
            Вы вправе запросить удаление, изменение или получение сведений о хранящихся
            персональных данных, обратившись к нам по контактному номеру телефона.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-foreground mb-2">8. Контакты</h2>
          <p>
            Для запроса об удалении персональных данных или по иным вопросам обращайтесь:
          </p>
          <p className="mt-2">
            <strong>Телефон:</strong>{" "}
            <a
              href="tel:+79107403111"
              className="text-malina-500 hover:underline"
            >
              +7 (910) 740-31-11
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
