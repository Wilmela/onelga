import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ProjectCard, ProjectSkeleton } from "@/components/project-card";
import SectionHeader from "@/components/section-header";
import { cachedprojects } from "@/lib/DAL/cache";
import { ProjectType } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
};

const ProjectsPage = () => {
  return (
    <section className="p-y">
      <MaxWidthWrapper className="p-y">
        <SectionHeader
          title="Projects Showcase"
          description="Interesting LGA projects"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

  if (!data) {
    return <div>No project found</div>;
  }

  return data.map((p: ProjectType) => (
    <ProjectCard
      _id={p._id}
      key={p.title}
      imageUrl={p.imageUrl}
      title={p.title}
      location={p.location}
      date={p.date}
      description={p.description}
      status={p.status}
    />
  ));
}
