import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("email-support");

export default function EmailSupportPage() {
  return <InfoPage page={infoPages["email-support"]} />;
}
