type MainProps = {
  children: React.ReactElement;
}

export default function Main(props: MainProps) {
  const { children } = props;

  return (
    <main className="flex-grow flex">
      <aside className="p-3 w-80 border-r">
        barra lateral
      </aside>
      <article className="p-5 bg-gray-50 flex-grow">
        {children}
      </article>
    </main>
  );
}
