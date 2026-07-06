import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("pricing");

export default function PricingPage() {
  return <InfoPage page={infoPages.pricing} />;
}
