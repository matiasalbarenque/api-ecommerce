import type { LandingProps } from '@/typings/components/layouts';
import AsideContent from './sidebar';

export default function Main(props: LandingProps) {
  const { children } = props;

  return (
    <main className="flex-grow flex">
      <aside className="p-3 w-[290px] border-r">
        <AsideContent />
      </aside>
      <article className="p-5 w-[calc(100%-290px)] bg-slate-50 flex-grow flex flex-col gap-5">{children}</article>
    </main>
  );
}
