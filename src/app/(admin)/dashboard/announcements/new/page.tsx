import AnnouncementForm from "@/features/announcements/components/announcement-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Create Announcement ",
};
const NewAnnouncementPage = () => {
  return <AnnouncementForm type="Create" />;
};

export default NewAnnouncementPage;
