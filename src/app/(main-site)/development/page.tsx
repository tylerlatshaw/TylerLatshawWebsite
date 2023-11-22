import { Metadata } from "next";
import Accordion from "@/components/developer/developer-accordion";
import DeveloperEmailForm from "@/components/developer/developer-email-send-form";
import AddRecordsForm from "@/components/developer/developer-add-records-form";
import EditRecordsForm from "@/components/developer/developer-edit-records-form";
import DeleteRecordsForm from "@/components/developer/developer-delete-records-form";
import FindRecordsForm from "@/components/developer/developer-find-records-form";

export const metadata: Metadata = {
  title: "Developer Tools",
};

const developerPageItems = [
  {
    title: "Send Emails",
    content: <DeveloperEmailForm />,
  },
  {
    title: "Add Record Albums",
    content: <AddRecordsForm />,
  },
  {
    title: "Edit Record Albums",
    content: <EditRecordsForm />,
  },
  {
    title: "Delete Record Albums",
    content: <DeleteRecordsForm />,
  },
  {
    title: "Find Record Albums",
    content: <FindRecordsForm />,
  }
];

export default function Page() {
  return <>
    <meta name="robots" content="noindex,nofollow" />

    <div className="h-full mb-16 md:pb-8 md:mb-28">
      <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">

        <h1>Developer Tools</h1>

        <div className="flex flex-row gap-4 w-full mt-8">

          <Accordion items={developerPageItems} />

        </div>

      </div>
    </div>
  </>;
}