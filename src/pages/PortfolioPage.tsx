import WantedPoster from "../components/WantedPoster";
import { useState } from "react";
import type { UserProfile } from "../types";

export default function PortfolioPage() {
  const [profile, setProfile] = useState<UserProfile>({
    username: "Rusty",
    netWorth: 5100,
    cash: 164,
    profitLoss: 2.0,
    profilePictureUrl: "",
  });

  function handleUpload(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({
        ...prev,
        profilePictureUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="container mt-4">
      <WantedPoster user={profile} onUpload={handleUpload} />
    </div>
  );
}
