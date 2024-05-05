import { Box, Badge } from "@chakra-ui/react";

export default function VariableBadges({ modes, value }) {
	return (
		<Box>
			{Object.keys(modes).map((mode, i) => {
				const obj = modes[mode];
				return (
					<>
						<Badge
							margin={"0px 7px"}
							variant={mode === value ? "solid" : "outline"}
							colorScheme={obj.COLOR.toLowerCase()}
							key={mode}
						>
							{obj.TEXT}
						</Badge>
						{i !== Object.keys(modes).length - 1 ? "/" : ""}
					</>
				);
			})}
		</Box>
	);
}
