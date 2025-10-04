type Props = { tone: string; setTone: (v: string) => void };
export default function OptionsBar({ tone, setTone }: Props) {
return (
<div className="flex gap-3 items-center">
<label className="text-sm text-gray-600">Tone</label>
<select className="border rounded px-2 py-1" value={tone} onChange={e =>
setTone(e.target.value)}>
<option value="balanced professional">Balanced Professional</option>
<option value="enthusiastic">Enthusiastic</option>
<option value="formal">Formal</option>
<option value="concise">Concise</option>
</select>
</div>
);
}
