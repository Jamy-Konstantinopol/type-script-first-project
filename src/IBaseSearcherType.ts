
export interface IBaseSearcherType<T> {
	init(datas: any[]): void;
	search(query: string): T[];
}
