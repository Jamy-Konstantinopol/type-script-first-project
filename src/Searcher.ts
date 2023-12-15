import Fuse, { FuseResult } from "fuse.js";
import { StringFixer } from "./StringFixer";
import { callbackify } from "util";
import { serialize } from "v8";


interface IndexData
{
	link: string;
	title: string;
	body: string;
}

interface IBaseSearcher
{
	init(datas : any[]) : void;
	search(query : string) : FuseResult<unknown>[];
}

export class Searcher
{
    private _indexes: IndexData[];
	
	/**Класс, который содержит метод, осуществляющий поиск
   	* @param datas - Файл, в котором производится поиск
   	*/
	constructor(datas : any[])
	{
		this._indexes = this._init(datas);
	}

	private _init(datas : any[])
	{
		return datas;
	}

	/**
   	* Делает поисковый запрос:
   	* @param datas - Файл, в котором производится поиск
   	* @param query - Строка, с помощью которого осуществляется поиск
   	* @returns Массив, состоящий из результата поиска
   	*/
    public search(query : string, searchType : IBaseSearcher) : FuseResult<unknown>[]
    {
		searchType.init(this._indexes);

		query = query.toLowerCase();
		let stringFixer = new StringFixer();
		let result = searchType.search(query)

		if(result.length > 0)
		{
			return result;
		}
		
		let wrongLayoutQuery = stringFixer.fixKeyboardLayout(query);

		result = searchType.search(wrongLayoutQuery)

		if(result.length > 0)
		{
			return result;
		}

		result = searchType.search(stringFixer.changeRussianToEngilshTranslirization(query));

		if(result.length > 0)
		{
			return result;
		}

		result = result = searchType.search(stringFixer.changeEngilshToRussianTranslirization(query));
		
		return result;
    }
}

export class FuseSearcher implements IBaseSearcher
{
	private _indexes: IndexData[] = [];

	public init(datas : any[])
	{
		this._indexes = datas;
	}

	public search(query : string) : FuseResult<unknown>[]
	{
		let fuse = new Fuse(this._indexes, {keys: ["link", "title", "body"]});
		let result = fuse.search(query);

		return result;
	}
}