import Fuse, { FuseResult } from "fuse.js";
import { BaseSearcher } from "./BaseSearcherType";
import { IndexData } from "./IndexData";


export class FuseSearcher implements BaseSearcher<FuseResult<unknown>>
{
	private _indexes: IndexData[] = [];
	private _fuse: Fuse<IndexData>;

	public init(datas: any[]) {
		this._indexes = datas;
		this._fuse = new Fuse(this._indexes, { keys: ["link", "title", "body"] });
	}

	public search(query: string): FuseResult<IndexData>[] {
		let result = this._fuse.search(query);

		return result;
	}
}
