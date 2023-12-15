
export interface BaseSearcher<T> {
	init(datas: any[]): void;
	search(query: string): T[];
}
