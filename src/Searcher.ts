import { StringRewriter } from "./StringRewriter";
import { BaseSearcher } from "./BaseSearcherType";
import { IndexData } from "./IndexData";

export class Searcher
{
    private _indexes: IndexData[];
	
	constructor(datas : any[])
	{
		this._indexes = this._init(datas);
	}

	private _init(datas : any[])
	{
		let indexes = [];

		datas.forEach(element => {
			
		});

		return datas;
	}

    public search<T>(query : string, searcherTypeClass : BaseSearcher<T>) : T[]
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
