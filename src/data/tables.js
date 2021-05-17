const pageVisits = [
	{ id: 1, views: 4.525, returnValue: 255, bounceRate: 42.55, pageName: '/demo/admin/index.html' },
	{ id: 2, views: 2.987, returnValue: 139, bounceRate: -43.52, pageName: '/demo/admin/forms.html' },
	{ id: 3, views: 2.844, returnValue: 124, bounceRate: -32.35, pageName: '/demo/admin/util.html' },
	{ id: 4, views: 1.22, returnValue: 55, bounceRate: 15.78, pageName: '/demo/admin/validation.html' },
	{ id: 5, views: 505, returnValue: 3, bounceRate: -75.12, pageName: '/demo/admin/modals.html' }
];

const adminUsers = [
	{ id: 1, name: 'Piero', lastName: 'Verdi', username: 'sede4', email: 'admin@admin.it'},
	{ id: 2, name: 'Gianni', lastName: 'Rossi', username: 'sede3', email: 'admin1@admin.it' },
	{ id: 3, name: 'Francesco', lastName: 'Neri', username: 'sede2', email: 'admin2@admin.it' }
];

const invoiceItems = [
	{ id: 1, item: 'Origin License', description: 'Extended License', price: '999,00', quantity: 1 },
	{ id: 2, item: 'Custom Services', description: 'Instalation and Customization (cost per hour)', price: '150,00', quantity: 20 },
	{ id: 3, item: 'Hosting', description: '1 year subcription', price: '499,00', quantity: 1 },
	{ id: 4, item: 'Platinum Support', description: '1 year subcription 24/7', price: '3999,00', quantity: 1 }
];

export { pageVisits, adminUsers, invoiceItems };
