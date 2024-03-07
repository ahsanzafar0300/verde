import { Button, DashboardSection } from "../../../../components";

export default function Files() {
  return (
    <DashboardSection>
      <div className="flex justify-between my-4">
        <h2 className="text-3xl font-semibold">Files</h2>
        <div className="flex gap-2">
          <Button title="Email" className="w-fit" />
          <Button title="Send to Doctor" className="w-fit" />
          <Button title="Print" className="w-fit" />
          <Button title="Upload Prescription" className="w-fit" />
        </div>
      </div>
    </DashboardSection>
  );
}
