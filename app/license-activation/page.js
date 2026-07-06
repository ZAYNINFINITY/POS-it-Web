import InfoPage from "../../components/InfoPage";
import { infoPages, metadataFor } from "../infoPages";

export const metadata = metadataFor("license-activation");

export default function LicenseActivationPage() {
  return <InfoPage page={infoPages["license-activation"]} />;
}
