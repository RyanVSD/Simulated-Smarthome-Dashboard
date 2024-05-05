import { Box, Badge } from "@chakra-ui/react";

export default function OnOffBadges({ on, green = "On", red = "Off" }) {
	return (
		<Box flex>
			<Badge
				margin={"0px 7px"}
				variant={on ? "solid" : "outline"}
				colorScheme="green"
			>
				{green}
			</Badge>
			/
			<Badge
				margin={"0px 7px"}
				variant={!on ? "solid" : "outline"}
				colorScheme="red"
			>
				{red}
			</Badge>
		</Box>
	);
}
