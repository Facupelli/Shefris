export default function ProductButton() {
  return (
    <div className="gap mt-2 flex h-16 items-stretch bg-gray-900 font-semibold text-white">
      <button className="grow ">Agregar</button>
      <div className="flex w-24 ">
        <button className="basis-3/5 cursor-auto border-l border-r border-gray-400 text-center ">
          1
        </button>
        <div className="grid basis-2/5">
          <button> + </button>
          <button> - </button>
        </div>
      </div>
    </div>
  );
}
