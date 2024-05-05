import GaugeComponent from "react-gauge-component";

export default function Electricity(props) {
	return (
		<GaugeComponent
			type="semicircle"
			arc={{
				width: 0.2,
				padding: 0.005,
				cornerRadius: 1,
				gradient: true,
				subArcs: [
					{
						limit: props.min,
						color: "#4a5568",
						showTick: true,
					},
					{
						limit: props.max,
						color: "#f6e05e",
						showTick: true,
					},
				],
			}}
			pointer={{
				color: "#345243",
				type: "arrow",
				//elastic: true,
			}}
			labels={{
				valueLabel: {
					formatTextValue: (value) => value + " KW",
					style: {
						textShadow: "none",
						fill: "black",
						fontWeight: "bold",
					},
				},
			}}
			value={props.value}
			minValue={props.min}
			maxValue={props.max}
		/>
	);
}
