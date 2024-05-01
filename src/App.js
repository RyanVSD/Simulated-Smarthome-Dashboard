import { useEffect, useState, useMemo } from "react";
import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";
import "./App.css";
import { authenticate, get } from "./apis.js";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "./Sidebar.js";
import Home from "./Home.js";
import Appliances from "./Appliances.js";
import Thermostat from "./Thermostat.js";
import Hazards from "./Hazards.js";
import Electricity from "./Electricity.js";
import Water from "./Water.js";
import DoorsAndWindows from "./DoorsAndWindows.js";

function App() {
	const [countdown, setCountdown] = useState(10);
	const [tokenResponse, setTokenResponse] = useState();
	const [needToken, setNeedToken] = useState(true);
	const [dataResponse, setDataResponse] = useState();
	const [data, setData] = useState();
	const [menu, setMenu] = useState("home");

	const token = useMemo(() => {
		if (tokenResponse != null && tokenResponse?.error === false) {
			return tokenResponse.token;
		} else {
			return "";
		}
	}, [tokenResponse]);

	const getToken = () => {
		return authenticate().then((response) => {
			console.log(response);
			setTimeout(() => {
				setTokenResponse(response);
			}, 100);
		});
	};

	const getData = useMemo(() => {
		return () => {
			console.log(token);
			if (token !== "") {
				get(token).then((response) => {
					setTimeout(() => {
						setDataResponse(response);
					}, 100);
				});
			}
		};
	}, [token]);

	const refresh = () => {
		setTokenResponse({});
		setDataResponse({});
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
		if (needToken) {
			getToken();
			setNeedToken(false);
		}
	}, [needToken]);

	useEffect(() => {
		getData();
	}, [getData]);

	useEffect(() => {
		if (dataResponse != null && dataResponse?.error === false) {
			setData(dataResponse.sensorData);
		}
	}, [dataResponse]);

	const haveData = useMemo(() => {
		return data != null;
	}, [data]);

	const water = useMemo(() => {}, [data]);

	const door = useMemo(() => {}, [data]);

	const window = useMemo(() => {}, [data]);

	const motion = useMemo(() => {}, [data]);

	const thermostat = useMemo(() => {}, [data]);

	const appliance = useMemo(() => {}, [data]);

	const electric = useMemo(() => {}, [data]);

	const safety = useMemo(() => {}, [data]);

	const internet = useMemo(() => {}, [data]);

	const renderSidebar = useMemo(() => {
		return (
			<Sidebar haveData={haveData} selected={menu} updMenu={setMenu} />
		);
	}, [haveData, menu, setMenu]);

	const renderPage = useMemo(() => {
		switch (menu) {
			case "appliances":
				return <Appliances />;
			case "thermostat":
				return <Thermostat />;
			case "hazards":
				return <Hazards />;
			case "electricity":
				return <Electricity />;
			case "water":
				return <Water />;
			case "doorsandwindows":
				return <DoorsAndWindows />;
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
	}, [menu, countdown, dataResponse, tokenResponse]);

	return (
		<ChakraProvider>
			<Flex>
				{renderSidebar}
				<Box>{renderPage}</Box>
			</Flex>
		</ChakraProvider>
	);
}

export default App;
