import Layout from "./components/Layout";
import AnimatedRoutes from "./components/AnimatedRoutes";
import ResetScroll from "./components/ResetScroll";

function App() {
	return (
		<Layout>
			<ResetScroll />
			<AnimatedRoutes />
		</Layout>
	);
}

export default App;
