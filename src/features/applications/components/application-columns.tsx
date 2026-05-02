"use client";

import { Edit, Eye, Power, Trash } from "lucide-react";
import { useTransition } from "react";

import { CellContext, ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import Spinner from "@/components/spinner";
import { ApplicationType } from "@/types";
import Link from "next/link";
import {
 
  deleteApplication,
  inviteApplication,

} from "../actions/application.actions";

type Props = ApplicationType;

export const ApplicationColumn: ColumnDef<Props>[] = [
  {
    accessorKey: "sn",
    header: () => <h1 className="tb-header">SN</h1>,
    cell: (info: CellContext<Props, unknown>) => info.row.index + 1,
  },
  {
    accessorKey: "applicationId",
    header: () => <h1 className="tb-header">APP ID</h1>,
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
    accessorKey: "qualification",
    header: () => <h1 className="tb-header">QUALIFICATION</h1>,
  },
  {
    accessorKey: "position",
    header: () => <h1 className="tb-header">POSITION</h1>,
  },
  {
    accessorKey: "invite",
    header: () => <h1 className="tb-header">INVITE</h1>,
    cell: ({ row }) => (
      <p className="uppercase">{row.original.invite ? "TRUE" : "FALSE"}</p>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const applicationId = row.original.applicationId;
      const invite = row.original.invite;

      return <TableActions applicationId={applicationId} invite={invite} />;
    },
  },
];

function DeleteItem({ applicationId }: { applicationId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(async () => {
          await deleteApplication(applicationId);
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

function ViewItem({ applicationId }: { applicationId: string }) {
  return (
    <div>
      <Link
        href={`/registrations/${applicationId}/view`}
        className="cursor-pointer"
      >
        <Eye className="text-app-blue size-4" />
      </Link>
    </div>
  );
}
function EditItem({ applicationId }: { applicationId: string }) {
  return (
    <div>
      <Link
        href={`/applications/${applicationId}/edit`}
        className="cursor-pointer"
      >
        <Edit className="text-app-blue size-4" />
      </Link>
    </div>
  );
}

function ToggleProcessed({
  applicationId,
  invite,
}: {
  applicationId: string;
  invite: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(async () => {
          await inviteApplication(applicationId, !invite);
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
              invite ? "text-green-500" : "text-red-500 ",
            )}
          />
        </div>
      )}
    </div>
  );
}

// Holds all table items above
export const TableActions = ({
  applicationId,
  invite,
}: {
  applicationId: string;
  invite: boolean;
}) => {
  return (
    <div className="inline-flex items-center space-x-4">
      <EditItem applicationId={applicationId} />
      <ToggleProcessed applicationId={applicationId} invite={invite} />
      <ViewItem applicationId={applicationId} />
      <DeleteItem applicationId={applicationId} />
    </div>
  );
};
