import { useProfiles } from '../contexts/ProfileProvider';

export default function SelectKid() {
  const { profiles } = useProfiles();
  return (
    <div className="p-4" data-testid="select-kid">
      {profiles.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  );
}
