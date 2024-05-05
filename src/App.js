import { useEffect, useState, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import { authenticate, get } from "./apis.js";
import { ChakraProvider, SimpleGrid } from "@chakra-ui/react";
import Sidebar from "./Sidebar.js";
import Home from "./Home.js";
import DataDisplay from "./DataDisplay.js";

function App() {
	const [countdown, setCountdown] = useState(10);
	const [tokenResponse, setTokenResponse] = useState({});
	const [needToken, setNeedToken] = useState(true);
	const [dataResponse, setDataResponse] = useState({});
	const [data, setData] = useState({});
	const [menu, setMenu] = useState("home");

	// Gets the token from the token response
	const token = useMemo(() => {
		if (tokenResponse != null && tokenResponse?.error === false) {
			return tokenResponse.token;
		} else {
			return "";
		}
	}, [tokenResponse]);

	// Sets the result of authenticate to tokenResponse
	const getToken = () => {
		return authenticate().then((response) => {
			setTimeout(() => {
				setTokenResponse(response);
			}, 1000);
		});
	};

	const getData = useMemo(() => {
		return () => {
			if (token !== "") {
				get(token).then((response) => {
					setDataResponse(response);
				});
			}
		};
	}, [token]);

	const refresh = () => {
		setNeedToken(true);
	};

	useEffect(() => {
		const int = setInterval(() => {
			if (countdown === 0) {
				setCountdown(10);
				refresh();
			} else {
				setCountdown(countdown - 1);
			}
		}, 1000);
		return () => {
			clearInterval(int);
		};
	});

	useEffect(() => {
		getData();
	}, [getData]);

	useEffect(() => {
		if (dataResponse != null && dataResponse?.error === false) {
			setData(dataResponse.sensorData);
		}
	}, [dataResponse]);

	const haveData = useMemo(() => {
		return Object.keys(data).length > 0;
	}, [data]);

	const retrieveGroup = useMemo(() => {
		return (groupId) => {
			return Object.keys(data).reduce((acc, key) => {
				if (data[key].groupId === groupId) {
					acc[key] = data[key];
				}
				return acc;
			}, {});
		};
	}, [data]);

	const renderSidebar = useMemo(() => {
		return (
			<Sidebar haveData={haveData} selected={menu} updMenu={setMenu} />
		);
	}, [haveData, menu, setMenu]);

	useEffect(() => {
		if (needToken) {
			if (dataResponse?.error === false) {
				setTokenResponse({
					error: false,
					token: dataResponse.token,
				});
			} else {
				getToken();
				setTokenResponse({});
			}
			setDataResponse({});
		}
		setNeedToken(false);
	}, [needToken, dataResponse]);

	const renderPage = useMemo(() => {
		switch (menu) {
			case "appliances":
				return <DataDisplay data={retrieveGroup("appliance")} />;
			case "thermostat":
				return <DataDisplay data={retrieveGroup("thermostat")} />;
			case "hazards":
				return <DataDisplay data={retrieveGroup("safety")} />;
			case "electricity":
				return <DataDisplay data={retrieveGroup("electric")} />;
			case "water":
				return <DataDisplay data={retrieveGroup("water")} />;
			case "sensors":
				return (
					<DataDisplay
						data={{
							...retrieveGroup("door"),
							...retrieveGroup("window"),
							...retrieveGroup("motion"),
						}}
					/>
				);
			default:
				return (
					<Home
						countdown={countdown}
						retry={refresh}
						data={dataResponse}
						tokenResponse={tokenResponse}
					/>
				);
		}
	}, [menu, countdown, retrieveGroup, dataResponse, tokenResponse]);

	return (
		<ChakraProvider>
			<Box>
				<Box
					boxShadow="1px 1px 7px 1px gray "
					borderRight="1px solid lightgray"
					position="fixed"
				>
					{renderSidebar}
				</Box>
				<SimpleGrid
					paddingLeft="290.49px"
					width="100%"
					height="fit-content"
					minChildWidth="300px"
					bg="blackAlpha.100"
				>
					{renderPage}
				</SimpleGrid>
			</Box>
		</ChakraProvider>
	);
}

export default App;
