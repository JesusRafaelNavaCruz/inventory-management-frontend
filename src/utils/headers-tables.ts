export const warehouseHeaders = [
	{
		name: 'SKU',
		selector: (row:any) => row.serialNumber,
	},
	{
		name: 'Nombre',
		selector: (row: any) => row.name,
	},
	{
		name: 'Tipo',
		selector: (row: any) => row.type,
	},
	{
		name: 'Stock',
		selector: (row: any) => row.stock,
	},
	{
		name: 'Acciones',
		selector: (row: any) => row.actions,
	},

];

