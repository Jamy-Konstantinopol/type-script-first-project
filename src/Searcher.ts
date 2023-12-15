import Fuse, { FuseResult } from "fuse.js";
import { StringRewriter } from "./StringRewriter";
import tokenizer from "./tokenizer";
import customPipeline from "./custorPipeline";
import lunr from "lunr";


interface IndexData
{
	link: string;
	title: string;
	body: string;
}

interface IBaseSearcherType<T>
{
	init(datas : any[]) : void;
	search<T>(query : string) : T[];
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
   	* @param searcherTypeClass - Файл, в котором производится поиск
   	* @param query - Строка, с помощью которого осуществляется поиск
   	* @returns Массив, состоящий из результата поиска
   	*/
    public search<T>(query : string, searcherTypeClass : IBaseSearcherType<T>) : T[]
    {
		searcherTypeClass.init(this._indexes);

		query = query.toLowerCase();
		let stringFixer = new StringRewriter();
		let result = searcherTypeClass.search<T>(query);

		if(result.length > 0)
		{
			return result;
		}
		
		let wrongLayoutQuery = stringFixer.fixKeyboardLayout(query);

		result = searcherTypeClass.search<T>(wrongLayoutQuery)

		if(result.length > 0)
		{
			return result;
		}

		result = searcherTypeClass.search<T>(stringFixer.changeRussianToEngilshTranslirization(query));

		if(result.length > 0)
		{
			return result;
		}

		result = result = searcherTypeClass.search<T>(stringFixer.changeEngilshToRussianTranslirization(query));
		
		return result;
    }
}

export class FuseSearcherType implements IBaseSearcherType<FuseResult<unknown>>
{
	private _indexes: IndexData[] = [];
	private _fuse : Fuse<IndexData>;

	public init(datas : any[])
	{
		this._indexes = datas;
		this._fuse = new Fuse(this._indexes, {keys: ["link", "title", "body"]});
	}

	public search(query : string) : any[]
	{
		let result = this._fuse.search(query);

		return result;
	}
}

export class LunrSearcherType implements IBaseSearcherType<lunr.Index>
{
	private _indexes : IndexData[] = [];
	private _fuse : Fuse<IndexData>;

	public init(datas : any[])
	{
		this._indexes = datas;
	}

	public search(query : string) : any[]
	{
		const indexes = this._indexes;
		const result = lunr(function () {
			this.field("link");
			this.field("title");
			this.field("body");

			this.tokenizer(tokenizer);
			this.pipeline.add(customPipeline);
			this.searchPipeline.add(customPipeline);

			this.pipeline.remove(lunr.trimmer);
			this.pipeline.remove(lunr.stopWordFilter);
			this.pipeline.remove(lunr.stemmer);

			this.searchPipeline.remove(lunr.trimmer);
			this.searchPipeline.remove(lunr.stopWordFilter);
			this.searchPipeline.remove(lunr.stemmer);

			this.metadataWhitelist = ["position"];
			Array.from(indexes).forEach((res) => {
				this.add(res);
			});
		});
		
		return result.search(query);
	}
}