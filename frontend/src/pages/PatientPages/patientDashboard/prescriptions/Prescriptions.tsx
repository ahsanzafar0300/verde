import { Button, DashboardSection } from "../../../../components";

export default function Prescriptions() {
  return (
    <DashboardSection>
      <div className="flex justify-between my-4">
        <h2 className="text-3xl font-semibold">Prescriptions</h2>
        <div className="flex gap-2">
          <Button title="Email" className="w-fit" />
          <Button title="Print" className="w-fit" />
        </div>
      </div>
    </DashboardSection>
  );
}
