import GaugeComponent from "react-gauge-component";

export default function Thermometer(props) {
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
						color: "#4aa7ff",
						showTick: true,
					},
					{
						limit: props.max,
						color: "#f54242",
						showTick: true,
					},
				],
			}}
			pointer={{
				color: "#345243",
				type: "arrow",
				// elastic: true,
			}}
			labels={{
				valueLabel: {
					formatTextValue: (value) => value + "ºF",
					style: {
						textShadow: "none",
						fill: "black",
						fontWeight: "bold",
					},
				},
			}}
			value={props.temperature}
			minValue={props.min}
			maxValue={props.max}
		/>
	);
}
