import { Metadata } from "next";
import Accordion from "@/components/developer/accordion";
import DeveloperEmailForm from "@/components/developer/email-send-form";
import AddRecordsForm from "@/components/developer/add-records-form";
import EditRecordsForm from "@/components/developer/update-records-form";
import DeleteRecordsForm from "@/components/developer/delete-records-form";
import SupabaseCommands from "@/components/developer/supabase-commands";
import NodeCommands from "@/components/developer/node-commands";
import GitCommands from "@/components/developer/git-commands";
import NetlifyCommands from "@/components/developer/netlify-commands";

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
    title: "Update Record Albums",
    content: <EditRecordsForm />,
  },
  {
    title: "Delete Record Albums",
    content: <DeleteRecordsForm />,
  },
  {
    title: "Supabase Commands",
    content: <SupabaseCommands />,
  },
  {
    title: "Node Commands",
    content: <NodeCommands />,
  },
  {
    title: "Git Commands",
    content: <GitCommands />,
  },
  {
    title: "Netlify Commands",
    content: <NetlifyCommands />,
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