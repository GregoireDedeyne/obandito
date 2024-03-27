interface AccordionItemProps {
  title: string;
  answer: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, answer }) => {
  return (
    <div className="flex flex-col flex-1 grow shrink-0 justify-center p-px bg-white rounded-xl border border-solid basis-0 border-black border-opacity-10 w-fit max-md:max-w-full">
      <div className="flex flex-col gap-5 justify-center px-5 py-6 rounded-xl border-b border-solid border-zinc-100 max-md:flex-wrap max-md:max-w-full">
        <div className="flex-auto">{title}</div>
        <div className="flex-auto text-slate-400 text-sm">{answer}</div>
      </div>
    </div>
  );
};

export function Faq() {
  const accordionData: AccordionItemProps[] = [
    {
      title: 'Est-ce que les organisateurs/artistes sont vérifiés ?',
      answer: 'Oui, tous les comptes sont soumis à une vérification',
    },
    {
      title: 'Faut-il signer un contrat avec un artiste ?',
      answer:
        "Effectivement, en fonction de l'état de l'artiste il sera préférable de faire un contrat",
    },
    {
      title: "Comment choisir le meilleur artiste sur O'Bandito.com ?",
      answer:
        'Tous les groupes sont triés en fonction de leur genre/région ce qui vous permets de choisir le groupe qui vous correspond le mieux',
    },
    {
      title: "Comment payer l'artiste sélectionné ?",
      answer:
        "Toutes les modalités de paiement sont à voir entre l'artiste et l'organisateur",
    },
    {
      title: 'Est-ce que le site est payant ?',
      answer: 'Non il est totalement gratuit',
    },
    {
      title: 'Est-ce que le site est payant ?',
      answer: 'Est-ce que les organisateurs/artistes sont vérifiés ?',
    },
  ];

  return (
    <section className="flex flex-col justify-center px-4 py-20 bg-slate-200">
      <h1 className="justify-center self-center text-3xl font-bold leading-9 text-center text-purple-800 max-md:max-w-full">
        Questions fréquemment posées sur{' '}
        <span className="text-rose-500">O'</span>
        <span className="text-purple-800">Bandito</span>
      </h1>
      <div className="flex flex-col mt-8 text-xl font-medium text-zinc-500 max-md:max-w-full">
        <div className="flex gap-5 leading-[140%] max-md:flex-wrap">
          {accordionData.slice(0, 2).map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              answer={item.answer}
            />
          ))}
        </div>
        <div className="flex gap-5 mt-6 max-md:flex-wrap">
          {accordionData.slice(2, 4).map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              answer={item.answer}
            />
          ))}
        </div>

        <div className="flex gap-5 mt-6 max-md:flex-wrap">
          {accordionData.slice(3, 5).map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
