import AsideContent from './sidebar';

export default function Main(props) {
  const { children } = props;

  return (
    <main className="flex-grow flex">
      <aside className="p-3 w-[290px] border-r">
        <AsideContent />
      </aside>
      <article className="p-4 w-[calc(100%-290px)] bg-slate-50 flex-grow flex flex-col gap-5">{children}</article>
    </main>
  );
}
