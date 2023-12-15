import Fuse, { FuseResult } from "fuse.js";
import { StringRewriter } from "./StringRewriter";
import tokenizer from "./tokenizer";
import customPipeline from "./customPipeline";
import lunr from "lunr";

interface IIndexData
{
	link: string;
	title: string;
	body: string;
}

interface IBaseSearcherType<T>
{
	init(datas : any[]) : void;
	search(query : string) : T[];
}

export class Searcher
{
    private _indexes: IIndexData[];
	
	constructor(datas : any[])
	{
		this._indexes = this._init(datas);
	}

	private _init(datas : any[])
	{
		return datas;
	}

    public search<T>(query : string, searcherTypeClass : IBaseSearcherType<T>) : T[]
    {
		searcherTypeClass.init(this._indexes);

		query = query.toLowerCase();
		let stringFixer = new StringRewriter();
		let result = searcherTypeClass.search(query);

		if(result.length > 0)
		{
			return result;
		}
		
		let wrongLayoutQuery = stringFixer.fixKeyboardLayout(query);

		result = searcherTypeClass.search(wrongLayoutQuery)

		if(result.length > 0)
		{
			return result;
		}

		result = searcherTypeClass.search(stringFixer.changeRussianToEngilshTranslirization(query));

		if(result.length > 0)
		{
			return result;
		}

		result = result = searcherTypeClass.search(stringFixer.changeEngilshToRussianTranslirization(query));
		
		return result;
    }
}

export class FuseSearcherType implements IBaseSearcherType<FuseResult<unknown>>
{
	private _indexes: IIndexData[] = [];
	private _fuse : Fuse<IIndexData>;

	public init(datas : any[])
	{
		this._indexes = datas;
		this._fuse = new Fuse(this._indexes, {keys: ["link", "title", "body"]});
	}

	public search(query : string) : FuseResult<IIndexData>[]
	{
		let result = this._fuse.search(query);

		return result;
	}
}

export class LunrSearcherType implements IBaseSearcherType<lunr.Index.Result>
{
	private _indexes : lunr.Index;

	public init(datas : any[])
	{
		this._indexes = lunr(function () {
			this.ref("link");
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
			Array.from(datas).forEach((data) => {
				this.add(data);
			});
		});
	}

	public search(query : string) : lunr.Index.Result[]
	{		
		return this._indexes.search(query);
	}
}