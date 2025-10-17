
export type ExpertiseMap = {
  Consultants: string[];
  Mentors: string[];
  Educators: string[];
};

export function Specialties(props: { onClose: () => void }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.4)" }}>
      <div style={{ position:"absolute", right:0, top:0, width:420, height:"100%", background:"#fff", padding:16 }}>
        <h2>Specialties (stub)</h2>
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>
  );
}
