import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("terms");

export default function TermsPage() {
  return <InfoPage page={infoPages.terms} />;
}
