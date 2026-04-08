import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DAPLayout from "@/components/DAP/layout/DAPLayout";
import SituationFamiliale from "@/components/DAP/details/SituationFamiliale/SituationFamiliale";
import Epoux from "@/components/DAP/details/Epoux/Epoux";
import Fils from "@/components/DAP/details/Fils/Fils";
import Diplomes from "@/components/DAP/details/Diplomes/Diplomes";
import InfoPro from "@/components/DAP/details/InfoProfessionnelle/InfoPro";
import SituationConseil from "@/components/DAP/details/SituationConseil/SituationConseil";
import SituationAdministrative from "@/components/DAP/details/SituationAdministrative/SituationAdministrative";
import Responsabilite from "@/components/DAP/details/Responsabilite/Responsabilite";
import InfoPerso from "@/components/DAP/details/InfoPerso/InfoPerso";
import Echelon from "@/components/DAP/details/Echelon/Echelon";
import Grade from "@/components/DAP/details/Grade/Grade";
import Autorisation from "@/components/DAP/details/AutorisationAnnEtSolde/AutorisationAnnEtSolde";

export default function FonctionnairePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = searchParams.get("section") || "infoPerso";
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    const nextSection = searchParams.get("section") || "infoPerso";
    setActiveSection(nextSection);
  }, [searchParams]);

  const handleSetActiveSection = (section) => {
    setActiveSection(section);
    setSearchParams({ section });
  };

  const renderSection = () => {
    switch (activeSection) {
      
      case "infoPerso":
        return <InfoPerso />;
  
      case "situationFamiliale":
        return <SituationFamiliale />;
  
      case "epoux":
        return <Epoux />;
  
      case "fils":
        return <Fils />;
  
      case "diplomes":
        return <Diplomes />;
  
      case "autorisation":
        return <Autorisation />;
  
      case "infoPro":
        return <InfoPro />;
  
      case "grade":
        return <Grade />;
  
      case "echelon":
        return <Echelon />;
  
      case "situationConseil":
        return <SituationConseil />;
  
      case "situationAdm":
        return <SituationAdministrative />;
  
      case "responsabilite":
        return <Responsabilite />;
  
      default:
        return <div>Section non trouvée</div>;
    }
  };
  return (
    <DAPLayout activeSection={activeSection} setActiveSection={handleSetActiveSection}>
      {renderSection()}
    </DAPLayout>
  );
}