import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Text,
	Spinner,
	Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
export default function Home(props) {
	const tokenRetrieved = props.tokenResponse?.error != null;
	const dataRetrieved = props.data?.error != null;

	const tokenError = tokenRetrieved && props.tokenResponse.error === true;
	const tokenErrorMsg = tokenError ? props.tokenResponse.msg : "";

	const dataError = dataRetrieved && props.data.error === true;
	const dataErrorMsg = dataError ? props.data.msg : "";
	return (
		<>
			<Card w="sm" maxH="sm" margin="10px">
				<CardHeader>
					<Heading size="lg">Authentication Status</Heading>
				</CardHeader>
				<Divider />
				<CardBody>
					{tokenRetrieved ? (
						tokenError ? (
							<Text color="red">Error: {tokenErrorMsg}</Text>
						) : (
							<Text color="green">Success!</Text>
						)
					) : (
						<Spinner />
					)}
				</CardBody>
				<Divider />
				<CardFooter>
					<Text>
						{tokenRetrieved ? (
							tokenError ? (
								<Button
									variant="outline"
									colorScheme="messenger"
									size="sm"
									borderRadius="0px"
									onClick={props.retry}
								>
									Retry
								</Button>
							) : (
								<Text>Complete</Text>
							)
						) : (
							"Loading"
						)}
					</Text>
				</CardFooter>
			</Card>
			<Card w="sm" maxH="sm" margin="10px">
				<CardHeader>
					<Heading size="lg">Data Status</Heading>
				</CardHeader>
				<Divider />
				<CardBody>
					{tokenRetrieved ? (
						tokenError ? (
							<Text color="red">Token Error</Text>
						) : dataRetrieved ? (
							dataError ? (
								<Text color="red">{dataErrorMsg}</Text>
							) : (
								<Text color="green">Success!</Text>
							)
						) : (
							<Spinner />
						)
					) : (
						<Spinner />
					)}
				</CardBody>
				<Divider />
				<CardFooter>
					<Text>
						{dataRetrieved ? (
							dataError ? (
								<Button
									variant="outline"
									colorScheme="messenger"
									size="sm"
									borderRadius="0px"
									onClick={props.retry}
								>
									Retry
								</Button>
							) : (
								<Text>Complete</Text>
							)
						) : (
							"Loading"
						)}
					</Text>
				</CardFooter>
			</Card>
			<Card w="sm" maxH="sm" margin="10px">
				<CardHeader>
					<Heading size="lg">Refresh</Heading>
				</CardHeader>
				<Divider />
				<CardBody>Time until next update: {props.countdown}</CardBody>
			</Card>
		</>
	);
}
