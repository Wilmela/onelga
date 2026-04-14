export function CopyDate() {
  const date = new Date().getFullYear();

  return (
    <p className="p-text text-white inline-flex">
      &copy;{date}&nbsp; ONELGA. All rights revserved.
    </p>
  );
}

export function LastUpdate() {
  const lastUpdate = new Date().toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <p className="mt-4 text-xs uppercase tracking-widest opacity-75">
      Last Updated: {lastUpdate}
    </p>
  );
}
export function fullDate(date: Date | string) {
  const res = new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return <p>{res}</p>;
}
