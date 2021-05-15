import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Dashboard.module.scss';
import ordersIcon from '../../../assets/icons/piggy-bank.png';
import profitIcon from '../../../assets/icons/check-list.png';
import Chart from 'react-apexcharts';

function Dashboard() {
	/*
	const [nOrdini, setnOrdini] = useState(0);
	const [admin, setAdmin] = useState({
		email: 'admin@admin.admin'
	});
	const history = useHistory();

	const getCredentials = () => {
		fetch('http://ecommerce.ideeinbit.it/api/amministratori/?email=' + admin.email)
			.then((res) => res.json())
			.then(
				(result) => {
					if (typeof result.records === 'undefined' || result.records === null) {
						history.push('/404');
						window.location.href = '/404';
					}
					setAdmin(result.records[0]);
				},
				(error) => {
					console.log(error);
					history.push('/404');
				}
			);
	};
	const getOrdini = () => {
		fetch('http://ecommerce.ideeinbit.it/api/ordini/')
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.message !== 'No Ordini found.') {
						setnOrdini(result.records.length);
					}
				},
				(error) => {
					console.log(error);
					history.push('/404');
				}
			);
	};

	useEffect(() => {
		getCredentials();
		getOrdini();
	}, []);
	*/
	const options = {
		chart: {
			id: 'basic-bar'
		},
		xaxis: {
			categories: [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007]
		}
	};
	const series = [
		{
			name: 'series-1',
			data: [30, 40, 45, 50, 49, 60, 70, 91]
		}
	];

	return (
		<main>
			<Chart options={options} series={series} type='line' width='500' />
		</main>
	);
}

export default CSSModules(Dashboard, styles, { allowMultiple: true });
