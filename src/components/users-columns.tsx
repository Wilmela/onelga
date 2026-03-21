"use client";

import { Power, Trash } from "lucide-react";
import { useTransition } from "react";

import { CellContext, ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { deleteUser, updateUserRole } from "@/lib/actions/user.actions";
import Spinner from "./spinner";

export type UserType = {
  userId: string;
  name: string;
  email: string;
  role: string;
};

export const usersColumn: ColumnDef<UserType>[] = [
  {
    accessorKey: "sn",
    header: () => <h1 className="tb-header">SN</h1>,
    cell: (info: CellContext<UserType, unknown>) => info.row.index + 1,
  },
  {
    accessorKey: "userId",
    header: () => <h1 className="tb-header">ID</h1>,
  },
  {
    accessorKey: "name",
    header: () => <h1 className="tb-header">NAME</h1>,
  },

  {
    accessorKey: "email",
    header: () => <h1 className="tb-header">EMAIL</h1>,
  },
  {
    accessorKey: "role",
    header: () => <h1 className="tb-header">ROLE</h1>,
    cell: ({ row }) => <p className="uppercase">{row.original.role}</p>,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const role = row.original.role;
      const email = row.original.email;

      return <TableActions role={role} email={email} />;
    },
  },
];

// function EditItem({ userId }: { userId: string }) {
//   return (
//     <Link
//       href={`/dashboard/admin/users/${userId}/edit`}
//       className="cursor-pointer"
//     >
//       <Edit className="text-primary size-4" />
//       {/* <p className="dashboard-action-text">Edit</p> */}
//     </Link>
//   );
// }

function DeleteItem({ email }: { email: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(async () => {
          await deleteUser(email);
        })
      }
    >
      {isPending ? (
        <Spinner />
      ) : (
        <div className="cursor-pointer">
          <Trash className="text-red-500 size-4" />
          {/* <span className="dashboard-action-text">DELETE</span> */}
        </div>
      )}
    </div>
  );
}

function ToggleRole({ email, role }: { email: string; role: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div
      onClick={() =>
        startTransition(async () => {
          await updateUserRole(email, role);
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
              "text-green-500 size-4"
            )}
          />
          {/* <p className="dashboard-action-text uppercase">{role}</p> */}
        </div>
      )}
    </div>
  );
}

// Holds all table items above
export const TableActions = ({
  // userId,
  role,
  email,
}: {
  // userId: string;
  role: string;
  email: string;
}) => {
  return (
    <div className="inline-flex items-center space-x-4">
      <ToggleRole email={email} role={role} />
      {/* <EditItem userId={userId} /> */}
      <DeleteItem email={email} />
    </div>
  );
};
