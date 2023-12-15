import { StringRewriter } from "./StringRewriter";
import { IBaseSearcherType } from "./IBaseSearcherType";
import { IIndexData } from "./IIndexData";

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
