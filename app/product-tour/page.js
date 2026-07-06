import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("product-tour");

export default function ProductTourPage() {
  return <InfoPage page={infoPages["product-tour"]} />;
}
