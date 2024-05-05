import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Heading,
} from "@chakra-ui/react";

export default function InfoCard(props) {
	return (
		<Card
			boxShadow="2px 2px 7px 2px gray"
			width="90%"
			height="fit-content"
			margin="10px"
		>
			{props.header != null ? (
				<CardHeader>
					<Heading fontSize="20px">{props.header}</Heading>
				</CardHeader>
			) : (
				<></>
			)}
			{props.body != null ? (
				<>
					<Divider />
					<CardBody>{props.body}</CardBody>
				</>
			) : (
				<></>
			)}
			{props.footer != null ? (
				<>
					<Divider />
					<CardFooter>{props.footer}</CardFooter>
				</>
			) : (
				<></>
			)}
		</Card>
	);
}
