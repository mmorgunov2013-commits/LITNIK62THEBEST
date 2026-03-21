import { LeadForm } from "@/components/forms/LeadForm";

export const metadata = {
  title: "Контакты",
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)]">
        Контакты
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--muted)]">
        Реквизиты и способы связи будут добавлены позже. Пока оставьте заявку —
        мы ответим по указанным контактам.
      </p>
      <div className="mt-10 max-w-xl">
        <LeadForm source="contacts" submitLabel="Отправить сообщение" />
      </div>
    </div>
  );
}
