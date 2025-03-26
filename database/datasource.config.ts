import { DataSource } from 'typeorm';
import dataSourceOptions from './mysql.config';

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
