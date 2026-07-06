import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("features");

export default function FeaturesPage() {
  return <InfoPage page={infoPages.features} />;
}
