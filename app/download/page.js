import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("download");

export default function DownloadPage() {
  return <InfoPage page={infoPages.download} />;
}
