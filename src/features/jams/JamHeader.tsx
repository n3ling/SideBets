export function JamHeader({ jamId }: { jamId: string }) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Jam</h1>
      <span className="text-sm text-gray-500">ID: {jamId}</span>
    </div>
  );
}
