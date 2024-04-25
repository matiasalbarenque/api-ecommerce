export default function Main(props) {
  const { children } = props;
  return (
    <main className="w-full h-full grow flex justify-center bg-slate-50">
      <article className="p-4 w-full h-min md:h-auto max-w-[1300px] flex">{children}</article>
    </main>
  );
}
