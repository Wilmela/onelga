
function CopyDate() {
  const date = new Date().getFullYear();

  return (
    <p className="p-text text-white inline-flex">
      &copy; {date} &nbsp; ONELGA. All rights revserved{date}
    </p>
  );
}

export default CopyDate;
