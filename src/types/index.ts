export type NewsType = {
  _id?: string;
  id: string;
  title: string;
  excerpt: string;
  banner: string;
  author: string;
  category: string;
  readTime?: string;
  slug: string;
  date: string;
  content: string;
  isPublished: boolean;
  featured: boolean;
  createdAt?: string;
  authorImage?: string;
  shots: { id: string; link: string }[];
  // updatedAt: "2025-11-09T03:59:20.123Z";
  // __v: 0;
};
export type AnnouncementType = {
  _id: string;
  id: string;
  title: string;
  date: string;
  content: string;
  isPublished?: boolean;
  type: string;
};
export type ExecutiveType = {
  _id?: string;
  name: string;
  position: string;
  bio: string;
  tenure: string;
  image: string;
  role: string;
  isPast: boolean;
};
export type CouncilorType = {
  _id?: string;
  name: string;
  position: string;
  role: string;

  bio: string;
  ward: number;
  tenure: string;
  image: string;
};

export type ProjectType = {
  _id: string;

  imageUrl: string;
  title: string;
  status: boolean;
  location: string;
  description: string;
  date: string;
  isEditable?: boolean;
};
export type BirthcertType = {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  address: string;
  dob: string;
  placeOfBirth: string;
  homeTown: string;
  isProcessed: boolean;
  certId: string;
};

export type LgaIdType = {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  address: string;
  placeOfBirth: string;
  homeTown: string;
  imageUrl: string;
  isProcessed: boolean;
  lgaCardId: string;
};
export type ApplicationType = {
  _id: string;
  applicationId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  cv: string;
  qualification: string;
  passport: string;
  invite: boolean;
};
export type ApplicationPostingType = {
  _id: string;
  title: string;
  position: string;
  description: string;
  requirements: string;
};
