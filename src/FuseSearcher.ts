import Fuse, { FuseResult } from "fuse.js";
import { BaseSearcher } from "./BaseSearcher";
import { IndexData } from "./IndexData";


export class FuseSearcher implements BaseSearcher<FuseResult<unknown>>
{
	private _indexes: IndexData[] = [];
	private _fuse: Fuse<IndexData>;

	constructor(datas : any[])
	{
		this._indexes = this._initIndexes(datas);
		this._fuse = new Fuse(this._indexes, { keys: ["link", "title", "body"] });
	}

	private _initIndexes(datas: any[])
	{
		const indexes = [...datas];
		return indexes;
	}

	public search(query: string): FuseResult<IndexData>[]
	{
		let result = this._fuse.search(query);

		return result;
	}
}
