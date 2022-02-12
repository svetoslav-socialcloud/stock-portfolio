import styles from './styles.module.css';
import DataTable from 'react-data-table-component';

export const PositionTable = (props) => {
    const columns = [
        {
            name: 'Ticker',
            selector: stock => stock.ticker
        },
        {
            name: 'Quantity',
            selector: stock => stock.quantity
        },
        {
            name: 'Current price',
            selector: stock => `$${stock.price.toLocaleString()}`
        },
        {
            name: 'Total value',
            selector: stock => `$${stock.totalValue.toLocaleString()}`
        }
    ];
    const data = props.stocks;

    return (<div className={styles.root}>
        <DataTable columns={columns} data={data} />
    </div>);
}