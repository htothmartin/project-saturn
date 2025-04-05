"use client";

import { Button } from "@/components/ui/button";
import { useActiveJob } from "@/hooks/useActiveJob";
import { selectIsProjectOwner } from "@/lib/store/features/project/projectSelectors";
import { useAppSelector } from "@/lib/store/hooks";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export const Sidebar = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  useActiveJob();
  const { projectId } = useParams<{ projectId: string }>();
  const isOwner = useAppSelector(selectIsProjectOwner);

  return (
    <div
      className={`flex h-full ${isOpen ? "w-40" : "w-12"} flex-col gap-4 border-r-2 bg-background p-2 transition-all duration-200`}
    >
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className={`justify-start ${!isOpen && "justify-center p-0"}`}
      >
        {isOpen ? <ArrowLeft /> : <ArrowRight />}
      </Button>
      {isOpen && (
        <>
          <Button asChild>
            <Link href={`/projects/${projectId}`}>Board</Link>
          </Button>
          <Button asChild>
            <Link href={`/projects/${projectId}/tickets`}>Tasks</Link>
          </Button>
          <Button asChild>
            <Link href={`/projects/${projectId}/members`}>Members</Link>
          </Button>
          {isOwner && (
            <Button asChild>
              <Link href={`/projects/${projectId}/management`}>Management</Link>
            </Button>
          )}
        </>
      )}
    </div>
  );
};
