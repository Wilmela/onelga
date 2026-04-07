import DashboardPagePeader from "@/components/dashboard-page-header";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ProjectCard, ProjectSkeleton } from "@/components/project-card";
import { cachedprojects } from "@/lib/DAL/cache";
import { ProjectType } from "@/types";
import { PlusSquare } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin | Projects",
};

const ProjectsPage = () => {
  return (
    <section>
      <MaxWidthWrapper className="p-y">
        <DashboardPagePeader
          title="Projects Showcase"
          description="Interesting LGA projects"
          currentPage="Projects"
          items={[
            { href: "/", title: "Home" },
            { href: "/dashboard", title: "Dashboard" },
          ]}
        />

        <Link href={"/dashboard/projects/new"}>
          <PlusSquare className="size-10" />
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          <Suspense
            fallback={
              <>
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
                <ProjectSkeleton />
              </>
            }
          >
            <RenderProjects />
          </Suspense>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default ProjectsPage;

async function RenderProjects() {
  const data = await cachedprojects();

  if (!data.length) {
    return <div>No project found. Click on the Plus sign above to add.</div>;
  }

  return data.map((p: ProjectType) => (
    <ProjectCard
      key={p.title}
      _id={p._id}
      imageUrl={p.imageUrl}
      title={p.title}
      location={p.location}
      date={p.date}
      description={p.description}
      status={p.status}
      isEditable={true}
    />
  ));
}
