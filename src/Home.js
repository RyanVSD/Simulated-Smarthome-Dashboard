import { Text, Spinner, Button } from "@chakra-ui/react";
import InfoCard from "./Components/InfoCard";
export default function Home(props) {
	const tokenRetrieved = props.tokenResponse?.error != null;
	const dataRetrieved = props.data?.error != null;

	const tokenError = tokenRetrieved && props.tokenResponse.error === true;
	const tokenErrorMsg = tokenError ? props.tokenResponse.msg : "";

	const dataError = dataRetrieved && props.data.error === true;
	const dataErrorMsg = dataError ? props.data.msg : "";
	return (
		<>
			<InfoCard
				header={"Authentication Status"}
				body={
					tokenRetrieved ? (
						tokenError ? (
							<Text color="red">Error: {tokenErrorMsg}</Text>
						) : (
							<Text color="green">Success!</Text>
						)
					) : (
						<Spinner />
					)
				}
				footer={
					tokenRetrieved ? (
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
					)
				}
			/>
			<InfoCard
				header="Data Status"
				body={
					tokenRetrieved ? (
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
					)
				}
				footer={
					dataRetrieved ? (
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
					) : tokenError ? (
						"Failed"
					) : (
						"Loading"
					)
				}
			/>
			<InfoCard
				header="Refresh"
				body={"Time until next update: " + props.countdown}
			/>
		</>
	);
}
