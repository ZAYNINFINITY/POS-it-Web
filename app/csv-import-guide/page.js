import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("csv-import-guide");

export default function CsvImportGuidePage() {
  return <InfoPage page={infoPages["csv-import-guide"]} />;
}
