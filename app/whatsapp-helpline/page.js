import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("whatsapp-helpline");

export default function WhatsAppHelplinePage() {
  return <InfoPage page={infoPages["whatsapp-helpline"]} />;
}
