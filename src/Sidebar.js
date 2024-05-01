import {
	Box,
	Flex,
	Icon,
	useColorModeValue,
	Text,
	Button,
	Divider,
} from "@chakra-ui/react";

import { RiFridgeLine } from "react-icons/ri";
import { LuDoorOpen } from "react-icons/lu";
import { GiLightningArc } from "react-icons/gi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { BsThermometerHalf } from "react-icons/bs";
import { GiSurprisedSkull } from "react-icons/gi";
import { FaLaptopHouse } from "react-icons/fa";

const LinkItems = [
	{ name: "Appliances", icon: RiFridgeLine },
	{ name: "Thermostat", icon: BsThermometerHalf },
	{ name: "Hazards", icon: GiSurprisedSkull },
	{ name: "Electricity", icon: GiLightningArc },
	{ name: "Water", icon: MdOutlineWaterDrop },
	{ name: "Doors and Windows", icon: LuDoorOpen },
];

export default function Sidebar(props) {
	const NavItem = ({ icon, children, name }) => {
		return (
			<Button
				style={{
					textDecoration: "none",
					width: "100%",
					height: "fit-content",
					borderRadius: "0px",
					background: props.selected === name ? "lightgray" : "",
				}}
				onClick={() => {
					props.updMenu(name);
				}}
				justifyContent={"left"}
				_hover={{ bg: "Silver !important" }}
				_focus={{ boxShadow: "none" }}
				isDisabled={!props.haveData}
			>
				<Flex
					borderRadius="lg"
					align="center"
					role="group"
					cursor="pointer"
					style={{ padding: "10px" }}
				>
					{icon && <Icon mr="4" fontSize="36" as={icon} />}
					{children}
				</Flex>
			</Button>
		);
	};

	return (
		<Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
			<Flex
				h="20"
				alignItems="center"
				mx="8"
				justifyContent="space-between"
				onClick={() => props.updMenu("menu")}
				style={{ transition: "0.25s ease-in-out" }}
				_hover={{ cursor: "pointer", color: "blue.500" }}
			>
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					SmartHome™
				</Text>
				<Icon
					marginLeft={"10px"}
					mr="4"
					fontSize="56"
					as={FaLaptopHouse}
				/>
			</Flex>
			<Divider borderColor="gray" />
			<Flex flexDirection="column">
				{LinkItems.map((link) => (
					<>
						<NavItem
							key={link.name}
							name={link.name.toLowerCase()}
							icon={link.icon}
						>
							{link.name}
						</NavItem>
						<Divider borderColor={"gray"} />
					</>
				))}
			</Flex>
		</Box>
	);
}
