type WorkCardProps = {
  title: string;
  description: string;
  href: string;
};

export const WorkCard = ({ title, description, href }: WorkCardProps) => {
  return (
    <article className='flex flex-col rounded-xl bg-neutral-950 p-6 text-white'>
      <h3 className='text-xl font-bold'>{title}</h3>
      <p className='mt-3 flex-1 text-sm leading-6 text-neutral-300'>
        {description}
      </p>
      <a
        className='mt-6 w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-neutral-950'
        href={href}
      >
        詳しく見る
      </a>
    </article>
  );
};
