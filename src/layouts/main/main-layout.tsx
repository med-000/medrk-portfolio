import { MainFooter } from "@/src/components/layout/main/main-footer";
import { MainHeader } from "@/src/components/layout/main/main-header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='flex flex-col'>
      <MainHeader />
      <main className='min-h-screen w-full'>{children}</main>
      <MainFooter />
    </div>
  );
};
