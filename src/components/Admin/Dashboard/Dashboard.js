import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Dashboard.module.scss';
import ordersIcon from '../../../assets/icons/piggy-bank.png';
import profitIcon from '../../../assets/icons/check-list.png';
import temp from '../../../assets/icons/chart.png';

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

	return (
		<main>
			<div styleName='welcome-text'>
				<h3>
					<span>Benvenuto,</span> admin
				</h3>
			</div>
			<div styleName='box-container'>
				<div styleName='box orders-box'>
					<img src={profitIcon} styleName='box-icon' alt='' />
					<div>
						<h4>23789</h4>Ordini
					</div>
				</div>
				<div styleName='box profit-box'>
					<img src={ordersIcon} styleName='box-icon' alt=''/>
					<div>
						<h4>&euro; 12890,89</h4> Ricavo
					</div>
				</div>
			</div>
			<img src={temp} style={{ width: '35rem' }} alt=''/>
		</main>
	);
}

export default CSSModules(Dashboard, styles, { allowMultiple: true });
