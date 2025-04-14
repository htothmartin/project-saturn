"use client";

import { selectActiveProject } from "@/lib/store/features/project/projectSelectors";
import { selectSession } from "@/lib/store/features/session/session-selectors";
import { useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import { UpdateProjectForm } from "./components/update-project-form";
import { Loader } from "@/components/Loader";
import { Accordion } from "@/components/Accordion";
import { CreateSprintForm } from "./components/create-sprint-form";
import { SprintList } from "./components/sprint-list";

const Management = (): React.JSX.Element => {
  const router = useRouter();

  const { currentUser } = useAppSelector(selectSession);
  const activeProject = useAppSelector(selectActiveProject);

  if (
    activeProject &&
    currentUser &&
    activeProject.owner.id !== currentUser.id
  ) {
    router.back();
  }

  if (!activeProject || !currentUser) {
    return <Loader />;
  }

  return (
    <div className="h-full w-full justify-center pt-6 md:flex">
      <div className="mx-6 flex md:w-1/2">
        <UpdateProjectForm className="w-[75%]" activeProject={activeProject} />
      </div>
      <div className="overflow-y-scroll p-6 md:w-1/2">
        <h2 className="text-xl">Sprints</h2>
        <Accordion triggerLabel="Create sprint">
          <CreateSprintForm />
        </Accordion>
        <SprintList sprints={activeProject.sprints} />
      </div>
    </div>
  );
};

export default Management;
