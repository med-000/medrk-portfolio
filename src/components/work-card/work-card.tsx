import { Button } from "@/components/ui/button";

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
      <Button className='mt-6 w-fit rounded-full' variant='secondary' asChild>
        <a href={href}>詳しく見る</a>
      </Button>
    </article>
  );
};
