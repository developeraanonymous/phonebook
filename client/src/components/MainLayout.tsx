import { Children } from '../@types/root.types';
import { Navbar } from './Navbar/Navbar';

const MainLayout: React.FC<Children> = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default MainLayout;
