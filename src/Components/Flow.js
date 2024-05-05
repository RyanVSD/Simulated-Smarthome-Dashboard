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
						color: "#dddddd",
						showTick: true,
					},
					{
						limit: props.min + (props.max - props.min) / 1.5,
						color: "#90CDF4",
						showTick: false,
					},
					{
						limit: props.max,
						color: "#4299E1",
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
					formatTextValue: (value) => value + " gal/min",
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
