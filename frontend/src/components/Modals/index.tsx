"use client";
import { ModalTypes } from "@/enums/ModalTypes";
import { useSearchParams } from "next/navigation";
import { ModalBase } from "./ModalBase";
import { CreateProject } from "./CreateProject";
import { AddTicket } from "./AddTicket";
import { AddMemeber } from "./AddMember";

type ModalData = {
  title: string;
  body: React.JSX.Element;
};

export function Modal(): React.JSX.Element {
  const params = useSearchParams();
  const modalType = params.get("modal");

  const content = (): ModalData => {
    switch (modalType) {
      case ModalTypes.CreateProject:
        return { title: "Create new project", body: <CreateProject /> };
      case ModalTypes.AddTicket:
        return { title: "Add ticket", body: <AddTicket /> };
      case ModalTypes.AddMember:
        return { title: "Add member", body: <AddMemeber /> };

      default:
        return { title: "Modal error!", body: <></> };
    }
  };

  const { title, body } = content();

  return (
    <>
      {modalType && (
        <ModalBase title={title} closeable>
          {body}
        </ModalBase>
      )}
    </>
  );
}
