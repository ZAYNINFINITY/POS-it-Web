import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("privacy");

export default function PrivacyPage() {
  return <InfoPage page={infoPages.privacy} />;
}
