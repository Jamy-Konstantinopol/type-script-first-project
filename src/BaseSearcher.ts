
export interface BaseSearcher<T> 
{
	search(query: string): T[];
}
