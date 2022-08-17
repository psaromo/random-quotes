import QuotePage from "./components/QuotePage";
import styles from "./styles.css";
import { Toaster } from "react-hot-toast";
function App() {
	return (
		<div className='App'>
			<QuotePage />
			<Toaster />
		</div>
	);
}

export default App;
