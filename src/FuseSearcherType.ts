import Fuse, { FuseResult } from "fuse.js";
import { IBaseSearcherType } from "./IBaseSearcherType";
import { IIndexData } from "./IIndexData";


export class FuseSearcherType implements IBaseSearcherType<FuseResult<unknown>>
{
	private _indexes: IIndexData[] = [];
	private _fuse: Fuse<IIndexData>;

	public init(datas: any[]) {
		this._indexes = datas;
		this._fuse = new Fuse(this._indexes, { keys: ["link", "title", "body"] });
	}

	public search(query: string): FuseResult<IIndexData>[] {
		let result = this._fuse.search(query);

		return result;
	}
}
