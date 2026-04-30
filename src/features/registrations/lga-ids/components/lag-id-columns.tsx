"use client";

import { Edit, Eye, Power, Trash } from "lucide-react";
import { useTransition } from "react";

import { CellContext, ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import Spinner from "@/components/spinner";
import { LgaIdType } from "@/types";
import Link from "next/link";
import { deleteLgaIdCard, processLgaIdCard } from "../actions/lgaId.actions";

type Props = LgaIdType;

export const lgacardColumn: ColumnDef<Props>[] = [
  {
    accessorKey: "sn",
    header: () => <h1 className="tb-header">SN</h1>,
    cell: (info: CellContext<Props, unknown>) => info.row.index + 1,
  },
  {
    accessorKey: "lgaCardId",
    header: () => <h1 className="tb-header">CARD ID</h1>,
  },
  {
    accessorKey: "firstName",
    header: () => <h1 className="tb-header">FIRST NAME</h1>,
  },

  {
    accessorKey: "lastName",
    header: () => <h1 className="tb-header">LAST NAME</h1>,
  },
  {
    accessorKey: "homeTown",
    header: () => <h1 className="tb-header">HOME TOWN</h1>,
  },
  {
    accessorKey: "placeOfBirth",
    header: () => <h1 className="tb-header">PLACE OF BIRTH</h1>,
  },
  {
    accessorKey: "isProcessed",
    header: () => <h1 className="tb-header">PROCESSED</h1>,
    cell: ({ row }) => (
      <p className="uppercase">{row.original.isProcessed ? "TRUE" : "FALSE"}</p>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const cardId = row.original.lgaCardId;
      const isProcessed = row.original.isProcessed;

      return <TableActions cardId={cardId} isProcessed={isProcessed} />;
    },
  },
];

function DeleteItem({ cardId }: { cardId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(async () => {
          await deleteLgaIdCard(cardId);
        })
      }
    >
      {isPending ? (
        <Spinner />
      ) : (
        <div className="cursor-pointer">
          <Trash className="text-red-500 size-4" />
        </div>
      )}
    </div>
  );
}

function ViewItem({ cardId }: { cardId: string }) {
  return (
    <div>
      <Link
        href={`/registrations/lga-id/${cardId}/view`}
        className="cursor-pointer"
      >
        <Eye className="text-app-blue size-4" />
      </Link>
    </div>
  );
}
function EditItem({ cardId }: { cardId: string }) {
  return (
    <div>
      <Link
        href={`/registrations/lga-id/${cardId}/edit`}
        className="cursor-pointer"
      >
        <Edit className="text-app-blue size-4" />
      </Link>
    </div>
  );
}

function ToggleProcessed({
  cardId,
  isProcessed,
}: {
  cardId: string;
  isProcessed: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(async () => {
          await processLgaIdCard(cardId, !isProcessed);
        })
      }
    >
      {isPending ? (
        <Spinner />
      ) : (
        <div className="cursor-pointer">
          <Power
            className={cn(
              isPending && "animate-pulse text-app-blue",
              "size-4",
              isProcessed ? "text-green-500" : "text-red-500 ",
            )}
          />
        </div>
      )}
    </div>
  );
}

// Holds all table items above
export const TableActions = ({
  cardId,
  isProcessed,
}: {
  cardId: string;
  isProcessed: boolean;
}) => {
  return (
    <div className="inline-flex items-center space-x-4">
      <EditItem cardId={cardId} />
      <ToggleProcessed cardId={cardId} isProcessed={isProcessed} />
      <ViewItem cardId={cardId} />
      <DeleteItem cardId={cardId} />
    </div>
  );
};
