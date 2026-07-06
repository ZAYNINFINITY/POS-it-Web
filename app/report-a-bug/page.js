import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("report-a-bug");

export default function ReportABugPage() {
  return <InfoPage page={infoPages["report-a-bug"]} />;
}
