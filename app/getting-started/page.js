import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("getting-started");

export default function GettingStartedPage() {
  return <InfoPage page={infoPages["getting-started"]} />;
}
