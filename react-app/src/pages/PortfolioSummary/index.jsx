import { PositionTable } from '../../components/PositionTable';
import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { Audio } from  'react-loader-spinner'

export const PortfolioSummary = () => {
    const [state, setState] = useState({});
    
    const getCurrentStockPrice = async (ticker) => {
        const API_KEY = 'c83nkbqad3ift3bmdg7g';
        const API_URL = `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`;
        
        const data = await fetch(API_URL);
        const json = await data.json();

        return json.c;
    }

    const getPortfolio = async () => {
        const stocks = [
            {
                ticker: 'AAL',
                quantity: 50
            },
            {
                ticker: 'BA',
                quantity: 275
            },
            {
                ticker: 'DAL',
                quantity: 25
            },
            {
                ticker: 'F',
                quantity: 1250
            },
            {
                ticker: 'GE',
                quantity: 650
            }
        ];
        let totalValue = 0;

        for (const stock of stocks) {
            stock.price = await getCurrentStockPrice(stock.ticker);
            stock.totalValue = stock.price * stock.quantity;
            totalValue += stock.totalValue;
        }

        return { stocks, totalValue };
    }

    useEffect(async () => {
        const portfolio = await getPortfolio();
        setState({
            ...state,
            portfolio: portfolio
        });
    }, []);

    return (<div className={styles.root}>
        {
            state.portfolio ? (<div><h1>${state.portfolio.totalValue.toLocaleString()}</h1><PositionTable stocks={state.portfolio.stocks} /></div>) : <Audio color="black"/>
        }
    </div>);
}