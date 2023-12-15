import Fuse, { FuseResult } from "fuse.js";
import { StringFixer } from "./StringFixer";


interface IndexData
{
	link: string;
	title: string;
	body: string;
}

export class Searcher
{
    private _indexes: IndexData[] = [];


	private _init(datas : any[])
	{
		this._indexes = datas;
	}

	/**
   	* Делает поисковый запрос:
   	* @param datas - Файл, в котором производится поиск
   	* @param query - Строка, с помощью которого осуществляется поиск
   	* @returns Массив, состоящий из результата поиска
   	*/
    public search(datas : any[], query : string) : FuseResult<unknown>[]
    {
		query = query.toLowerCase();

		this._init(datas);

		let stringFixer = new StringFixer();
		let fuse = new Fuse(this._indexes, {keys: ["link", "title", "body"]});
		let result = fuse.search(query);

		if(result.length > 0)
		{
			return result;
		}
		
		let wrongLayoutQuery = stringFixer.fixKeyboardLayout(query);

		result = fuse.search(wrongLayoutQuery);

		if(result.length > 0)
		{
			return result;
		}

		result = fuse.search(stringFixer.changeRussianToEngilshTranslirization(query));

		if(result.length > 0)
		{
			return result;
		}

		result = fuse.search(stringFixer.changeEngilshToRussianTranslirization(query));
		
		return result;
    }
}