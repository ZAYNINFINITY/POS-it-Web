import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("faq");

export default function FaqPage() {
  return <InfoPage page={infoPages.faq} />;
}
