"use client";

import { Edit, Trash } from "lucide-react";
import Link from "next/link";

type Props = {
  isEditable?: boolean;
  editHref: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: () => Promise<any>;
};
const EditTab = ({ isEditable = false, editHref, onDelete }: Props) => {
  return (
    isEditable && (
      <div className="flex items-center justify-between p-2 space-x-8 bg-app-blue/10">
        <Link href={editHref}>
          <Edit className="text-app-blue hover:text-blue-800 cursor-pointer" />
        </Link>
        <Trash
          className="text-app-red hover:text-red-800 cursor-pointer"
          onClick={() => onDelete()}
        />
      </div>
    )
  );
};

export default EditTab;
