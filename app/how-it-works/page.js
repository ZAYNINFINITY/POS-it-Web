import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("how-it-works");

export default function HowItWorksPage() {
  return <InfoPage page={infoPages["how-it-works"]} />;
}
