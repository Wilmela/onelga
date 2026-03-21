import React from "react";
import { CustomBreadCrumb } from "./customs";
import SectionHeader from "./section-header";

type ItemType = {
  href: string;
  title: string;
};
type Props = {
  title: string;
  description: string;
  currentPage: string;
  items: ItemType[];
};
const DashboardPagePeader = ({
  title,
  description,
  currentPage,
  items,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <SectionHeader title={title} description={description} />

      <div className="hidden md:block w-1/4">
        <CustomBreadCrumb currentPage={currentPage} items={items} />
      </div>
    </div>
  );
};

export default DashboardPagePeader;
