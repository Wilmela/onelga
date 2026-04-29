"use client";

import { Edit, Eye, Power, Trash } from "lucide-react";
import { useTransition } from "react";

import { CellContext, ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import Spinner from "@/components/spinner";
import { BirthcertType } from "@/types";
import {
  deleteBirthcert,
  processBirthcert,
} from "@/features/registrations/birth-certs/actions/birth-cert.actions";
import Link from "next/link";

type Props = BirthcertType;

export const birthCertColumn: ColumnDef<Props>[] = [
  {
    accessorKey: "sn",
    header: () => <h1 className="tb-header">SN</h1>,
    cell: (info: CellContext<Props, unknown>) => info.row.index + 1,
  },
  {
    accessorKey: "certId",
    header: () => <h1 className="tb-header">CERT ID</h1>,
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
    accessorKey: "isProcessed",
    header: () => <h1 className="tb-header">PROCESSED</h1>,
    cell: ({ row }) => (
      <p className="uppercase">{row.original.isProcessed ? "TRUE" : "FALSE"}</p>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const certId = row.original.certId;
      const isProcessed = row.original.isProcessed;

      return <TableActions certId={certId} isProcessed={isProcessed} />;
    },
  },
];

function DeleteItem({ certId }: { certId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(async () => {
          await deleteBirthcert(certId);
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

function ViewItem({ certId }: { certId: string }) {
  return (
    <div>
      <Link
        href={`/registrations/birth-cert/${certId}/view`}
        className="cursor-pointer"
      >
        <Eye className="text-app-blue size-4" />
      </Link>
    </div>
  );
}
function EditItem({ certId }: { certId: string }) {
  return (
    <div>
      <Link
        href={`/registrations/birth-cert/${certId}/edit`}
        className="cursor-pointer"
      >
        <Edit className="text-app-blue size-4" />
      </Link>
    </div>
  );
}

function ToggleProcessed({
  certId,
  isProcessed,
}: {
  certId: string;
  isProcessed: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(async () => {
          await processBirthcert(certId, !isProcessed);
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
  certId,
  isProcessed,
}: {
  certId: string;
  isProcessed: boolean;
}) => {
  return (
    <div className="inline-flex items-center space-x-4">
      <EditItem certId={certId} />
      <ToggleProcessed certId={certId} isProcessed={isProcessed} />
      <ViewItem certId={certId} />
      <DeleteItem certId={certId} />
    </div>
  );
};
