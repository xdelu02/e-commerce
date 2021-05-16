import React from 'react';
import { faCashRegister, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { CounterWidget, CircleChartWidget, BarChartWidget, SalesValueWidget, SalesValueWidgetPhone } from '../../Widgets/Widgets';
import { trafficShares, totalOrders } from '../../../data/charts';

export default function Dashboard() {
	return (
		<>
			<Row className='justify-content-md-center mt-3'>
				<Col xs={12} className='mb-4 d-none d-sm-block'>
					<SalesValueWidget title='Vendite' value='10,567' percentage={10.57} />
				</Col>
				<Col xs={12} className='mb-4 d-sm-none'>
					<SalesValueWidgetPhone title='Vendite' value='10,567' percentage={10.57} />
				</Col>
				<Col xs={12} sm={6} xl={4} className='mb-4'>
					<CounterWidget category='Clienti' title='345k' period='Feb 1 - Apr 1' percentage={18.2} icon={faChartLine} iconColor='shape-primary' />
				</Col>

				<Col xs={12} sm={6} xl={4} className='mb-4'>
					<CounterWidget category='Ricavi' title='43,594' period='Feb 1 - Apr 1' percentage={28.4} icon={faCashRegister} iconColor='shape-tertiary' />
				</Col>

				<Col xs={12} sm={6} xl={4} className='mb-4'>
					<CircleChartWidget title='Ordini' data={trafficShares} />
				</Col>
			</Row>
		</>
	);
}
