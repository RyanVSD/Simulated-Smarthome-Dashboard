import InfoCard from "./Components/InfoCard";
import Thermometer from "./Components/Thermometer";
import OnOffBadges from "./Components/OnOffBadges";
import { StatusContext } from "./StatusContext";
import VariableBadges from "./Components/VariableBadges";
import Electricity from "./Components/Electricity.js";
import Flow from "./Components/Flow.js";
import { useMemo } from "react";

function sortFunc(a, b) {
	const values = {
		boolean: 1,
		modes: 2,
		temperature: 3,
		power: 4,
		flow: 5,
	};
	return values[a] - values[b];
}

export default function DataDisplay({ data }) {
	const sortData = useMemo(() => {
		const el = Object.keys(data).reduce((acc, key) => {
			const el = data[key];
			const type = StatusContext[el.description].TYPE;
			if (acc[type] == null) {
				acc[type] = [];
			}
			acc[type].push(el);
			return acc;
		}, {});
		return el;
	}, [data]);
	return (
		<>
			{Object.keys(sortData)
				.sort(sortFunc)
				.map((key) => {
					return sortData[key].map((obj) => {
						const context = StatusContext[obj.description];
						return (
							<InfoCard
								header={obj.description}
								key={obj.description}
								body={(() => {
									switch (context.TYPE) {
										case "boolean":
											return (
												<OnOffBadges
													on={
														obj.value ^
														context.SWITCH
													}
													red={context.RED}
													green={context.GREEN}
												/>
											);
										case "temperature":
											return (
												<Thermometer
													max={context.MAX}
													min={context.MIN}
													temperature={obj.value}
												/>
											);
										case "modes":
											return (
												<VariableBadges
													modes={context.MODES}
													value={obj.value}
												/>
											);
										case "power":
											return (
												<Electricity
													max={context.MAX}
													min={context.MIN}
													value={obj.value}
												/>
											);
										case "flow":
											return (
												<Flow
													max={context.MAX}
													min={context.MIN}
													value={obj.value}
												/>
											);
										default:
											return <></>;
									}
								})()}
							/>
						);
					});
				})}
		</>
	);
}
