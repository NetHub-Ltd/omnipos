"use client";
import { useBusinessContext } from "../layout";

export default function SettingsPage() {
  const { businessId, businessName } = useBusinessContext();

  return (
    <div>
      <h1>Settings for Business: {businessName}</h1>
      {/* Your settings logic here */}
    </div>
  );
}
