import { MainLayout } from "../../layouts/main/main-layout";

export default function Play() {
  return (
    <MainLayout>
      <div className='mx-auto w-full max-w-5xl px-6 py-12'>
        <h1 className='text-3xl font-bold text-neutral-900'>Play</h1>
        <p className='mt-4 text-neutral-600'>これはPlayページです</p>
      </div>
    </MainLayout>
  );
}
