import { MainLayout } from "../layouts/main/main-layout";

export default function Home() {
  return (
    <MainLayout>
      <div className='mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-12'>
        <section className='rounded-2xl bg-neutral-950 px-8 py-16 text-white'>
          <p className='text-sm font-bold text-sky-300'>Portfolio</p>
          <h1 className='mt-4 text-4xl font-bold'>
            Hello,World I am Riki Maeda
          </h1>
          <p className='mt-4 max-w-2xl text-neutral-300'>
            Next.jsとTailwind CSSを使って、ポートフォリオを作っています。
          </p>
        </section>

        <section id='skills'>
          <h2>Skills</h2>
          <div>
            <div>
              <h3>Next.js</h3>
              <p>
                ページ作成、ルーティング、コンポーネント分割を練習しています。
              </p>
            </div>
            <div>
              <h3>Tailwind CSS</h3>
              <p>classNameを使って、余白、色、レイアウトを調整できます。</p>
            </div>
            <div>
              <h3>GitHub</h3>
              <p>ブランチ、コミット、push、PR作成を練習しています。</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
