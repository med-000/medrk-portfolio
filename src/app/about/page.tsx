import { MainLayout } from "../../layouts/main/main-layout";

export default function About() {
  return (
    <MainLayout>
      <div className='mx-auto w-full max-w-5xl px-6 py-12'>
        <h1 className='text-3xl font-bold text-neutral-900'>About</h1>
        <p className='mt-4 text-neutral-600'>これはaboutページです</p>
      </div>
    </MainLayout>
  );
}
