import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SkillCardProps = {
  title: string;
  description: string;
};

export const SkillCard = ({ title, description }: SkillCardProps) => {
  return (
    <Card className='transition hover:-translate-y-1 hover:shadow-md'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
